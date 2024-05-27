import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useLocation } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { useSpring, animated } from '@react-spring/web';

const DataKaryawan = () => {
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [closingPopup, setClosingPopup] = useState(false);
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const data = [
    { id: 1, username: 'budi', nama: 'Budi Suntoso', nik: '1238740340', notelpon: '083627319282', jabatan: 'Kepala Bidang', bidang: 'Umum', password:'1234567', email: 'budi@example.com', alamat: 'Alamat Budi' },
    { id: 2, username: 'lia', nama: 'Lia Safitri', nik: '4579290102', notelpon: '038722837271', jabatan: 'Kepala Bidang', bidang: 'Keuangan', password:'1234567', email: 'lia@example.com', alamat: 'Alamat Lia'  },
    // Add more data objects here
  ];

  const openPopup = (row) => {
    setSelectedRow(row); // Set the selected row
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const popupAnimation = useSpring({
    opacity: popupOpen ? 1 : 0,
    transform: popupOpen ? 'translateY(0%)' : 'translateY(-100%)',
  });
  const closingPopupAnimation = useSpring({
    opacity: closingPopup ? 0 : 1,
    transform: closingPopup ? 'translateY(-100%)' : 'translateY(0%)',
  });
  const handleClosePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      setPopupOpen(false);
      setClosingPopup(false);
    }, 300); // Adjust the duration according to your animation timing
  };

  const columns = [
    {
      name: 'Nama',
      selector: row => row.nama,
      sortable: true,
      $grow: 2,
    },
    {
      name: 'NIK',
      selector: row => row.nik,
      sortable: true,
      $grow: 2,
    },
    {
      name: 'No Telpon',
      selector: row => row.notelpon,
      sortable: true,
      $grow: 1,
    },
    {
      name: 'Jabatan',
      selector: row => row.jabatan,
      sortable: true,
      $grow: 1,
    },
    {
      name: 'Bidang',
      selector: row => row.bidang,
      sortable: true,
      $grow: 1,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]' >
          <img src="/src/assets/image/icons8-whatsapp.gif" alt="" style={{fontSize:'15px'}}/>
        </button>
          <button className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]' onClick={() => openPopup(row)}>
            <img src="/src/assets/image/icons8-eye.gif" alt="" srcset="" />
          </button>
        </div>
      ),
      $grow: 1,
    },
  ];

  const Links = [
    { name: 'Dashboard', link: '/petugas/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/petugas/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Daftar Tamu', link: '/petugas/daftartamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/petugas/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/petugas/laporan', icon: <SummarizeRoundedIcon /> },
    { name: 'panduan', link: '/petugas/panduan', icon: <AutoStoriesRoundedIcon /> },
  ];

  const formattedDateTime = moment().format('DD/MM/YYYY HH:mm');

  const handleLogout = () => {
    console.log('Logged out');
  };

  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    const filteredData = data.filter(item =>
      item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nik.toLowerCase().includes(searchText.toLowerCase()) ||
      item.notelpon.toLowerCase().includes(searchText.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchText.toLowerCase()) ||
      item.bidang.toLowerCase().includes(searchText.toLowerCase())
    );
    setTableData(filteredData);
  };
  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? 240 : 0,
    opacity: isSidebarOpen ? 1 : 0,
  });

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
    const navbarAnimation = useSpring({
    height: isDropdownOpen ? 90 : 0,
    opacity: isDropdownOpen ? 1 : 0,
  });
  
  return (
    <div className="flex h-screen overflow-hidden">
        <animated.div style={sidebarAnimation} className="flex-none w-64 bg-gray-800 text-white overflow-y-auto overflow-x-hidden">
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
        </animated.div>
      <div className="flex flex-col w-full md:w-auto flex-1">
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
                <img className="rounded-full ml-2 mr-2" src="/src/assets/image/profil.png" width="24" height="24" alt="User 01" />
                Petugas
              </button>
                <animated.ul style={navbarAnimation} className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
                  <li className="py-2 hover:bg-gray-700">
                    <Link to="/Petugas/UserProfil">
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
                </animated.ul>
            </div>
          </div>
        </div>
        <div>
          <div className="flex p-8">
             <GroupRoundedIcon style={{fontSize:'40px', marginRight:'8px'}}/>
            <h1 className='font-extrabold text-3xl'>Data Karyawan</h1>
          </div>
          <div className="container w-full md:w-auto md:ml-6 md:mr-6 overflow-x-auto shadow-md">
            <div id="recipients" className="p-10 mt-6 lg:mt-0 rounded shadow bg-white">
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button onClick={handleSearch} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                    Search
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={tableData}
                  responsive={true}
                  striped={true}
                  hover={true}
                  pagination={true}
                  responsiveLayout="scroll"
                />
              </div>
            </div>
            {selectedRow && popupOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <animated.div style={closingPopup ? closingPopupAnimation : popupAnimation} className=" bg-white p-8 w-auto rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-center">Detail Karyawan</h2>
                  <div className='flex items-center justify-center'>
                    <label htmlFor="profile-picture-upload" className="relative inline-flex mb-4 items-center mr-5 cursor-pointer">
                      <input type="file" id="profile-picture-upload" name="profile-picture-upload" accept="image/*" className="hidden" />
                        <img className="rounded-full cursor-pointer" src="/src/assets/image/profil.png" width="64" height="64" alt="User 01" />
                    </label>
                  </div>
                  <div className=' grid items-center justify-center grid-cols-2 gap-2 '>
                    <div className="mb-2">Username: {selectedRow.username}</div>
                  <div className="mb-2">Nama: {selectedRow.nama}</div>
                  <div className="mb-2">NIK: {selectedRow.nik}</div>
                  <div className="mb-2">No Telpon: {selectedRow.notelpon}</div>
                  <div className="mb-2">Jabatan: {selectedRow.jabatan}</div>
                  <div>Bidang: {selectedRow.bidang}</div>
                  <div className="mb-2">Password: {selectedRow.password}</div>
                  {/* Tampilkan data tambahan yang diinginkan */}
                  <div className="mb-2">Alamat: {selectedRow.alamat}</div></div>
                  <div  className='flex items-center justify-center'><button className="hover:bg-blue-700 bg-blue-600 w-full text-white px-4 py-2 rounded mt-4" onClick={handleClosePopup}>Close</button></div>
                  
                </animated.div>
              </div>
            )}
            {showAddModal && (
              <div className="fixed inset-0  flex items-center justify-center">
                <div className="bg-white p-4 rounded shadow">
                  <h2>Add New Entry</h2>
                  <input type="text" placeholder="nama" />
                  <input type="text" placeholder="NIK" />
                  <input type="text" placeholder="Notelpon" />
                  <button onClick={handleCloseAddModal}>Cancel</button>
                  <button>Add</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKaryawan;
