import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

import { useSpring, animated } from '@react-spring/web';

const DaftarTamu = () => {
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [closingPopup, setClosingPopup] = useState(false);
  const [TambahOpen, setTambahOpen] = useState(false);
  const [closingTambahPopup, setClosingTambahPopup] = useState(false);
  const [closingEditPopup, setClosingEditPopup] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [activePage, setActivePage] = useState('');

  const openPopup = (row) => {
    setSelectedRow(row); // Set the selected row
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const openTambahPopup = () => {
    setTambahOpen(true);
  };

  const closeTambahPopup = () => {
    setTambahOpen(false);
  };
  const openEditPopup = () => {
    setEditOpen(true);
  };

  const closeEditPopup = () => {
    setEditOpen(false);
  };
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const data = [
    { id: 1, nama: 'Bu Mia', nik: '1238740340', notelpon: '083627319282', tujuan: 'Budi Santoso', keperluan: 'Rapat Dinas', tanggal:'20/03/2024',jam_masuk:'13:21', jam_keluar:'14:00', alamat: 'Bandar Lampung',status: 'Pending' },
    { id: 1, nama: 'Bu Eni', nik: '3384929393', notelpon: '083647271122', tujuan: 'Budi Santoso', keperluan: 'Rapat Dinas', tanggal:'21/03/2024',jam_masuk:'13:21', jam_keluar:'14:00', alamat: 'Bandar Lampung',status: 'Pending' },
    // Add more data objects here
  ];

  const columns = [
  {
    name: 'Nama',
    selector: row => row.nama,
    sortable: true,
    $grow: 2, // Using $grow instead of grow
  },
  {
    name: 'Tujuan',
    selector: row => row.tujuan,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  {
    name: 'Keperluan',
    selector: row => row.keperluan,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  {
    name: 'Tanggal',
    selector: row => row.tanggal,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => openPopup(row)} className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]'>
          <img src="/src/assets/image/icons8-eye.gif" alt=""  style={{fontSize:'15px'}} />
        </button>
        <button onClick={openEditPopup} className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]'>
          <img src="/src/assets/image/icons8-pencil.gif" alt="" style={{fontSize:'15px'}} />
        </button>
        <button className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]'>
          <img src="/src/assets/image/icons8-trash.gif" alt="" style={{ fontSize: '15px'}} />
        </button>
      </div>
    ),
    $grow: 1, // Using $grow instead of grow
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSearch = () => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.position.toLowerCase().includes(searchText.toLowerCase()) ||
      item.office.toLowerCase().includes(searchText.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? 240 : 0,
    opacity: isSidebarOpen ? 1 : 0,
  });
  const navbarAnimation = useSpring({
    height: isDropdownOpen ? 90 : 0,
    opacity: isDropdownOpen ? 1 : 0,
  });
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
    }, 300); 
  };
  const popupTambahAnimation = useSpring({
    opacity: TambahOpen ? 1 : 0,
    transform: TambahOpen ? 'translateY(0%)' : 'translateY(-100%)',
  });
  const closingTambahPopupAnimation = useSpring({
  opacity: closingTambahPopup ? 0 : 1,
  transform: closingTambahPopup ? 'translateY(-100%)' : 'translateY(0%)',
});

const handleTambahClosePopup = () => {
  setClosingTambahPopup(true);
  setTimeout(() => {
    setTambahOpen(false);
    setClosingTambahPopup(false);
  }, 300);
};
  const popupEditAnimation = useSpring({
    opacity: EditOpen ? 1 : 0,
    transform: EditOpen ? 'translateY(0%)' : 'translateY(-100%)',
  });

  
  const closingEditPopupAnimation = useSpring({
  opacity: closingEditPopup ? 0 : 1,
  transform: closingEditPopup ? 'translateY(-100%)' : 'translateY(0%)',
});

const handleEditClosePopup = () => {
  setClosingEditPopup(true);
  setTimeout(() => {
    setEditOpen(false);
    setClosingEditPopup(false);
  }, 300);
};
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
                Admin
              </button>
                 <animated.ul style={navbarAnimation}  className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
                  <li className="py-2 hover:bg-gray-700">
                    <button className="flex items-center pl-4 pr-2 focus:outline-none" onClick={handleLogout}>
                      <Person2RoundedIcon className="mr-2" />
                      Profil
                    </button>
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
            <GroupsRoundedIcon style={{fontSize:'40px', marginRight:'8px'}}/>
            <h1 className='font-extrabold text-3xl'>Daftar Tamu</h1>
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
                  <button onClick={openTambahPopup} className="bg-green-500 text-white px-4 py-2 rounded md:px-3 md:py-3 hover:bg-green-600">
                    <AddRoundedIcon style={{ marginRight: '2px' }} />
                    Tambah
                  </button>
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
                  <h2 className="text-xl font-semibold mb-4 text-center">Detail Tamu</h2>
                  <div className='flex items-center justify-center'>
                    <label htmlFor="profile-picture-upload" className="relative inline-flex mb-4 items-center mr-5 cursor-pointer">
                      <input type="file" id="profile-picture-upload" name="profile-picture-upload" accept="image/*" className="hidden" />
                        <img className="rounded-full cursor-pointer" src="/src/assets/image/profil.png" width="64" height="64" alt="User 01" />
                    </label>
                  </div>
                  <div className=' grid items-center justify-center grid-cols-2 gap-2 '>
                    <div className="mb-2">Nama: {selectedRow.nama}</div>
                  <div className="mb-2">NIK: {selectedRow.nik}</div>
                  <div className="mb-2">No.Telepon: {selectedRow.notelpon}</div>
                  <div className="mb-2">Keperluan: {selectedRow.tujuan}</div>
                  <div className="mb-2">Tujuan: {selectedRow.keperluan}</div>
                  <div className="mb-2">Alamat: {selectedRow.alamat}</div>
                  <div className="mb-2">Tanggal: {selectedRow.tanggal}</div>
                  <div className="mb-2">Jam Masuk: {selectedRow.jam_masuk}</div>
                  <div className="mb-2">Jam Keluar: {selectedRow.jam_keluar}</div>
                  <div className="mb-2">Alamat: {selectedRow.alamat}</div></div>
                  <div className='flex items-center justify-center'><button className="bg-blue-600 hover:bg-blue-700 w-full text-white px-4 py-2 rounded mt-4" onClick={handleClosePopup}>Close</button></div>
                  
                </animated.div>
              </div>
            )}
          {TambahOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
               <animated.div style={closingTambahPopup ? closingTambahPopupAnimation : popupTambahAnimation} className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative">
                  <CloseIcon onClick={handleTambahClosePopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <AddRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Tambah Data Tamu</h1>
                  <form action="#" className="grid grid-cols-3 gap-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama</label>
                      <input type="text" id="nama" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="nama" required/>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                      <input type="text" id="NIK" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="NIK" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telpon</label>
                      <input type="text" id="no.telpon" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="No. Telpon " required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tujuan</label>
                      <input type="text" id="tujuan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="tujuan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keperluan</label>
                      <input type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Keperluan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
                      <input type="date" id="tanggal" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Tanggal" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jam Masuk</label>
                      <input type="time" id="jam_masuk" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jam Masuk" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jam Keluar</label>
                      <input type="time" id="jam_keluar" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jam Keluar " required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                      <input type="text" id="alamat" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="alamat" required/>
                    </div>
                    <div></div>
                    <button type="reset" className="button-masuk col-span-3 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-3 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
                  </form>
                </animated.div>
              </div>
            )}
          {EditOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <animated.div style={closingEditPopup ? closingEditPopupAnimation : popupEditAnimation} className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
                  <CloseIcon onClick={handleEditClosePopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <EditRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Edit Data Tamu</h1>
                  <form action="#" className="grid grid-cols-3 gap-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama</label>
                      <input type="text" id="nama" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="nama" required/>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                      <input type="text" id="NIK" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="NIK" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telpon</label>
                      <input type="text" id="no.telpon" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="No. Telpon " required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tujuan</label>
                      <input type="text" id="tujuan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="tujuan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keperluan</label>
                      <input type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Keperluan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
                      <input type="date" id="tanggal" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Tanggal" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jam Masuk</label>
                      <input type="time" id="jam_masuk" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jam Masuk" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jam Keluar</label>
                      <input type="time" id="jam_keluar" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jam Keluar " required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                      <input type="text" id="alamat" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="alamat" required/>
                    </div>
                    <div></div>
                    <button type="reset" className="button-masuk col-span-3 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-3 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
                  </form>
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

export default DaftarTamu;
