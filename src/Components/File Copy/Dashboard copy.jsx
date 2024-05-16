import { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';

const StickyNoteForm = ({ onSubmit }) => {
  const [newNoteText, setNewNoteText] = useState('');

  const handleSubmit = () => {
    onSubmit(newNoteText);
    setNewNoteText('');
  };

  return (
    <div className="absolute bottom-8 right-8 bg-yellow-200 px-4 py-3 rounded-md shadow-md">
      <textarea className="block w-full mb-2 p-2 rounded-md" placeholder="Add a new note..." value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleSubmit}>Add Note</button>
    </div>
  );
};

const Dashboard = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const formattedDateTime = moment().format('DD/MM/YYYY HH:mm');

  const handleLogout = () => {
    console.log('Logged out');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 const addNote = (text) => {
  if (text.trim() !== '') {
    if (notes.length < 5) {
      const newNote = {
        id: Date.now(),
        text: text
      };
      setNotes([...notes, newNote]);
    } else {
      alert("You've reached the maximum limit of 5 notes.");
    }
  }
  setShowNoteForm(false);
};

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

 const location = useLocation();

  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);


  const Links = [
    { name: 'Dashboard', link: '/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Data Tamu', link: '/datatamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/laporan', icon: <SummarizeRoundedIcon /> },
  ];


return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="flex-none w-64 bg-gray-800 text-white overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col mt-6">
            <div className='flex items-center ml-2 mb-8'>
            <img src='/src/assets/image/logo.png' className="w-10" alt="Avatar" />
            <span className="text-xl font-bold ml-2">DKP Lampung</span>
            </div>
            
          {Links.map((link) => (
            <li className={`py-2 hover:bg-gray-700 ${link.link === activePage ? 'bg-gray-700' : ''}`} key={link.name}>
              <Link
                to={link.link}
                className={`flex items-center pl-4 ${
                  link.name === 'Home' ? 'marker bg-slate-700 h-1 w-4 rounded-full text-white' : ''
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
      )}
      {/* End of Sidebar */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center shadow-md bg-gray-800 text-white py-4 px-4">
          <div className="flex items-center">
            <button className="focus:outline-none mr-4" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
            
          </div>
          <div className="flex items-center relative">
            <div className="text-sm text-gray-400 mr-6 ml-6">{formattedDateTime}</div>
            <div className="relative">
              <button className="flex items-center mr-4 pl-4 focus:outline-none" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <Person2RoundedIcon className="mr-2" />
                Profile
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
                  <li className="py-2 hover:bg-gray-700">
                    <button className="flex items-center pl-4 pr-2 focus:outline-none" onClick={handleLogout}>
                      <ExitToAppIcon className="mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className='overflow-auto ml-13'>
          <div className="flex p-8">
            <h1 className='font-extrabold text-3xl'>Dashboard</h1>
          </div>
          <div className={`grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-3 p-8 pt-4 w-full`}>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                        <span>Buku Tamu Yang Ditunda</span>
                    </div>
                    <div className="text-3xl">
                        50
                    </div>
                </div>
            </div>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                        <span>Total Tamu</span>
                    </div>
                    <div className="text-3xl">
                        50
                    </div>
                </div>
            </div>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                        <span>Total Pegawai</span>
                    </div>
                    <div className="text-3xl">
                        50
                    </div>
                </div>
            </div>
          </div>
          <div className={`bg-white ml-8 mr-8 rounded-lg shadow-md grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-4`}>
            {notes.map(note => (
              <div key={note.id} className={`relative p-6 rounded-2xl bg-white`} style={{backgroundColor:'#67C6E3', width:'100%', maxHeight: '150px'}}>
                <div className="space-y-2">
                  <p className="text-gray-500" style={{ wordWrap: 'break-word' }}>{note.text}</p>
                  <button className="absolute top-2 right-2 focus:outline-none" onClick={() => deleteNote(note.id)}><CancelRoundedIcon /></button>
                </div>
              </div>
            ))}
              {/* Sticky Note Form */}
                {showNoteForm && <StickyNoteForm onSubmit={addNote} />}
                {/* End of Sticky Note Form */}
                {/* Icon untuk menampilkan form note */}
                <button 
                  className= {`grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-4 `}
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  style={{ zIndex: 999 }} // Menetapkan z-ind ex untuk memastikan ikon tetap di atas konten
                >
                  <AddCircleOutlineOutlinedIcon className=' ' style={{ fontSize: '3rem', color: 'gray'}}/>
                </button>
                {/* End of Icon untuk menampilkan form note */}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
