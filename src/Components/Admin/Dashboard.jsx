import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import '../../assets/Style/style.css';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [activePage, setActivePage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [newEventEnd, setNewEventEnd] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const formattedDateTime = moment().format('DD/MM/YYYY HH:mm');

  const handleLogout = () => {
    console.log('Logged out');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const Links = [
    { name: 'Dashboard', link: '/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Daftar Tamu', link: '/daftartamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/laporan', icon: <SummarizeRoundedIcon /> },
  ];

  const addEvent = () => {
    const newEvent = {
      title: newEventTitle,
      start: new Date(newEventStart),
      end: new Date(newEventEnd),
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setNewEventStart('');
    setNewEventEnd('');
    setShowPopup(false);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const customDayProp = (date) => {
    if (moment(date).isSame(moment(), 'day')) {
      return {
        className: 'current-date-cell bg-blue-300 text-white',
      };
      
    }
    return {};
  };

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
                  <span className={moment(currentDate).date() === 1 ? 'current-date' : ''}>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* End of Sidebar */}
      <div className="flex flex-col w-full md:w-auto flex-1">
        <div className="flex justify-between items-center shadow-md bg-gray-800 text-white py-4 px-4">
          <div className="flex items-center">
            <button className="focus:outline-none mr-4" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
          </div>
          <div className="flex items-center z-50 relative">
            <div className="text-sm text-gray-400 mr-6 ml-6">{formattedDateTime}</div>
            <div className="relative">
             <button className="flex items-center mr-4 pl-4 focus:outline-none" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img className="rounded-full ml-2 mr-2" src="/src/assets/image/profil.png" width="24" height="24" alt="User 01" />
                Admin
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
                  <li className="py-2 hover:bg-gray-700">
                    <Link to="/UserProfil">
                      <button className="flex items-center pl-4 pr-2 focus:outline-none" onClick={handleLogout}>
                        <Person2RoundedIcon className="mr-2" />
                        Profil
                      </button>
                    </Link>
                  </li>
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
            <DashboardRoundedIcon style={{fontSize:'40px', marginRight:'8px'}}/>
            <h1 className='font-extrabold text-3xl'>Dashboard</h1>
          </div>
          <div className={`grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-3 p-8 pt-4 w-full`}>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                  <span>Buku Tamu Yang Ditunda</span>
                </div>
                <div className="text-3xl">50</div>
              </div>
            </div>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                  <span>Total Tamu</span>
                </div>
                <div className="text-3xl">50</div>
              </div>
            </div>
            <div className="relative p-6 rounded-2xl shadow-md bg-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                  <span>Total Pegawai</span>
                </div>
                <div className="text-3xl">50</div>
              </div>
            </div>
          </div>
          <div className="px-8">
            {/* Calendar Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Calendar Component */}
              <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 350 }} // Mengatur warna teks menjadi hijau
                dayPropGetter={customDayProp}
              />
              <div className="flex justify-end mt-4"> {/* Container untuk tombol "Add" */}
                <button
                  onClick={() => setShowPopup(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Tambah Agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pop-up */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
          <div className="relative bg-white p-8 rounded-lg z-50">
            <h3 className="text-lg font-semibold mb-4">Add Event</h3>
            <input
              type="text"
              placeholder="Event title"
              className="px-3 py-1 border border-gray-300 rounded-md mb-2 w-full"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <input
              type="datetime-local"
              placeholder="Start date"
              className="px-3 py-1 border border-gray-300 rounded-md mb-2 w-full"
              value={newEventStart}
              onChange={(e) => setNewEventStart(e.target.value)}
            />
            <input
              type="datetime-local"
              placeholder="End date"
              className="px-3 py-1 border border-gray-300 rounded-md mb-2 w-full"
              value={newEventEnd}
              onChange={(e) => setNewEventEnd(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Tambah Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
