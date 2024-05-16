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
const DaftarTamu = () => {
  const location = useLocation();

  const [activePage, setActivePage] = useState('');

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
    name: 'NIK',
    selector: row => row.nik,
    sortable: true,
    $grow: 2, // Using $grow instead of grow
  },
  {
    name: 'No Telpon',
    selector: row => row.notelpon,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
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
    name: 'Jam Masuk',
    selector: row => row.jam_masuk,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  {
    name: 'Jam Keluar',
    selector: row => row.jam_keluar,
    sortable: true,
    $grow: 1, // Using $grow instead of grow
  },
  {
    name: 'Alamat',
    selector: row => row.alamat,
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
        <Link to="/FormEditTamu">
        <button className='bg-blue-600 text-white px-2 py-2 rounded flex items-center hover:bg-blue-700'>
          <RemoveRedEyeRoundedIcon style={{ fontSize: '15px'}} />
        </button></Link>
        <Link to="/FormEditTamu">
        <button className='bg-green-600 text-white px-2 py-2 rounded flex items-center hover:bg-green-700'>
          <EditRoundedIcon style={{ fontSize: '15px'}} />
        </button></Link>
        <button className='bg-red-600 text-white px-2 py-2 rounded flex items-center hover:bg-red-700'>
          <DeleteForeverRoundedIcon style={{ fontSize: '15px'}}/>
        </button>
      </div>
    ),
    $grow: 1, // Using $grow instead of grow
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
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="flex p-8">
            <h1 className='font-extrabold text-3xl'>Daftar Tamu</h1>
          </div>
          <div className="container w-full md:w-auto md:ml-6 md:mr-6 overflow-x-auto">
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
                <Link to="/FormTambahKaryawan">
                  <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded md:px-6 md:py-3 hover:bg-green-600">
                    <AddRoundedIcon style={{ marginRight: '2px' }} />
                    Tambah
                  </button>
                </Link>
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
