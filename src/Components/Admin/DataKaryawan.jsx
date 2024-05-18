import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
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
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CloseIcon from '@mui/icons-material/Close';

const DataKaryawan = () => {
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [TambahOpen, setTambahOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
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
          <button className='bg-blue-600 text-white px-2 py-2 rounded flex items-center hover:bg-blue-700' onClick={() => openPopup(row)}>
            <RemoveRedEyeRoundedIcon style={{ fontSize: '15px'}} />
          </button>
            <button onClick={openEditPopup} className='bg-green-600 text-white px-2 py-2 rounded flex items-center hover:bg-green-700'>
              <EditRoundedIcon style={{ fontSize: '15px'}} />
            </button>
          <button className='bg-red-600 text-white px-2 py-2 rounded flex items-center hover:bg-red-700'>
            <DeleteForeverRoundedIcon style={{ fontSize: '15px'}}/>
          </button>
        </div>
      ),
      $grow: 1,
    },
  ];

  const Links = [
    { name: 'Dashboard', link: '/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Daftar Tamu', link: '/daftartamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/laporan', icon: <SummarizeRoundedIcon /> },
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

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
                <div className=" bg-white p-8 w-auto rounded-lg shadow-lg">
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
                  <div className='flex items-center justify-center'><button className="hover:bg-blue-700 bg-blue-600 w-full text-white px-4 py-2 rounded mt-4" onClick={closePopup}>Close</button></div>
                  
                </div>
              </div>
            )}
          {TambahOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
                  <CloseIcon onClick={closeTambahPopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <AddRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Tambah Data Karyawan</h1>
                  <form action="#" className="grid grid-cols-2 gap-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                      <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="username" required/>
                    </div>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jabatan</label>
                      <input type="text" id="jabatan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jabatan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                      <input type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Bidang" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                      <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="password" required/>
                    </div>
                    <div></div>
                    <button type="reset" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
                  </form>
                </div>
              </div>
            )}
          {EditOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
                  <CloseIcon onClick={closeEditPopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <EditRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Edit Data Karyawan</h1>
                  <form action="#" className="grid grid-cols-2 gap-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                      <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="username" required/>
                    </div>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jabatan</label>
                      <input type="text" id="jabatan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jabatan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                      <input type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Bidang" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                      <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="password" required/>
                    </div>
                    <div></div>
                    <button type="reset" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
                  </form>
                </div>
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
