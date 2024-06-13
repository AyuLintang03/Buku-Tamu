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
import { useSpring, animated } from '@react-spring/web';
import { RollerShades } from '@mui/icons-material';

const DataKaryawan = () => {
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupClose, setPopupClose] = useState(false);
  const [TambahOpen, setTambahOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [closingTambahPopup, setClosingTambahPopup] = useState(false);
  const [closingEditPopup, setClosingEditPopup] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [karyawan, setKaryawan] = useState([]);
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
 
  useEffect(() => {
    fetchKaryawan();
  }, []);
  
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const fetchKaryawan = async () => {
  try {
    const response = await fetch('/admin/datakaryawan', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const data = await response.json();
    setKaryawan(data);
  } catch (error) {
    console.error('Error fetching karyawan:', error);
  }
};

const [showDeletePopup, setShowDeletePopup] = useState(false);
const [closingDeletePopup, setClosingDeletePopup] = useState(false);
 const handleDelete = (row) => {
  setSelectedRow(row);
  setShowDeletePopup(true);
};

const closeDeletePopup = () => {
  setShowDeletePopup(false);
};

const deleteKaryawan = async (id) => {
  try {
    const response = await fetch(`/admin/datakaryawan/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      fetchKaryawan(); // Refresh data karyawan setelah berhasil menghapus
    } else {
      console.error('Gagal menghapus data karyawan');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

const [formData, setFormData] = useState({
  username: '',
  user_name: '',
  nik: '',
  email: '',
  no_tlp: '',
  jabatan: '',
  bidang: '',
  alamat: '',
  password: '',
  role: '',
});

const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('/admin/datakaryawan/create', {
      method: 'POST',
      headers: {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': csrfToken
},
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); 
      alert('Data berhasil ditambahkan!');
      setFormData({
      username: '',
      user_name: '',
      nik: '',
      email: '',
      no_tlp: '',
      jabatan: '',
      bidang: '',
      alamat: '',
      password: ''});
      setTambahOpen(false);
      fetchKaryawan();
    } else {
      console.error('Gagal menambahkan data karyawan');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

const handleUpdate = (row) => {
  setSelectedRow(row); 
  setEditOpen(true);

  // Cari data karyawan yang sesuai dari state `karyawan`
  const karyawanToEdit = karyawan.find((k) => k.id === row.id);

  if (karyawanToEdit) {
    setFormData({
      username: karyawanToEdit.username,
      user_name: karyawanToEdit.user_name,
      email: karyawanToEdit.email,
      nik: karyawanToEdit.nik,
      no_tlp: karyawanToEdit.no_tlp,
      jabatan: karyawanToEdit.jabatan,
      bidang: karyawanToEdit.bidang,
      alamat: karyawanToEdit.alamat,
      password: '', 
      role: karyawanToEdit.role,
    });
  }
};

const handleSubmitUpdate = async (e) => {
  e.preventDefault();

  if (!selectedRow) {
    console.error('selectedRow is null');
    return;
  }

  try {
    const updatedData = {
      username: formData.username || selectedRow.username,
      user_name: formData.user_name || selectedRow.user_name,
      email: formData.email || selectedRow.email,
      nik: formData.nik || selectedRow.nik,
      no_tlp: formData.no_tlp || selectedRow.no_tlp,
      jabatan: formData.jabatan || selectedRow.jabatan,
      bidang: formData.bidang || selectedRow.bidang,
      alamat: formData.alamat || selectedRow.alamat,
      password: formData.password || '',
      role: formData.role || selectedRow.role,
    };

    const response = await fetch(`/admin/datakaryawan/${selectedRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      setFormData({
        username: '',
        user_name: '',
        email: '',
        nik: '',
        no_tlp: '',
        jabatan: '',
        bidang: '',
        alamat: '',
        password: '',
      });
      setEditOpen(false);
      alert('Data berhasil diupdate!');
      fetchKaryawan();
    } else {
      console.error('Gagal mengupdate data karyawan');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = async () => {
  try {
    const response = await fetch(`/admin/datakaryawan/search?search=${searchTerm}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const data = await response.json();
    setKaryawan(data);
  } catch (error) {
    console.error('Error searching karyawan:', error);
  }
};
  const data = [
    { id: 1, username: 'budi', nama: 'Budi Suntoso', nik: '1238740340', notelpon: '083627319282', jabatan: 'Kepala Bidang', bidang: 'Umum', password:'1234567', email: 'budi@example.com', alamat: 'Alamat Budi' },
    { id: 2, username: 'lia', nama: 'Lia Safitri', nik: '4579290102', notelpon: '038722837271', jabatan: 'Kepala Bidang', bidang: 'Keuangan', password:'1234567', email: 'lia@example.com', alamat: 'Alamat Lia'  },
    
  ];

  const openPopup = (row) => {
    setSelectedRow(row); 
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
  const openEditPopup = (row) => {
    setSelectedRow(row);
    
    setEditOpen(true);
  };

  const closeEditPopup = () => {
    setEditOpen(false);
  };
  const columns = [
    {
    name: 'No',
    cell: (row, index) => <div>{index + 1}</div>,
    sortable: true,
    $grow: 1,
  },
  {
    name: 'Username',
    selector: (row) => row.username,
    sortable: true,
    $grow: 1,
  },
  {
    name: 'NIK',
    selector: (row) => row.nik,
    sortable: true,
    $grow: 1,
  },
  {
    name: 'Bidang',
    selector: (row) => row.bidang,
    sortable: true,
    $grow: 1,
  },
  
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]' >
            <a href={`https://wa.me/${row.no_tlp}?text=Halo%20${row.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 hover:shadow-md hover:translate-y-[2px]">
              <img src="/build/assets/images/icons8-whatsapp.gif" alt="" style={{fontSize:'15px'}}/>
          </a>
          </button>
          <button  onClick={() => (row ? openEditPopup(row) : null)} className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]'>
            <img src="/build/assets/images/icons8-pencil.gif" alt="" style={{fontSize:'15px'}} />
          </button>
          <button className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]' onClick={() => openPopup(row)}>
            <img src="/build/assets/images/icons8-eye.gif" alt=""  />
          </button>
          <button onClick={() => handleDelete(row)}  className='h-8 w-8 hover:shadow-md hover:translate-y-[2px]'>
            <img src="/build/assets/images/icons8-trash.gif" alt="" style={{ fontSize: '15px'}} />
          </button>
        </div>
      ),
      $grow: 1,
    },
  ];
  
  const Links = [
    { name: 'Dashboard', link: '/admin/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/admin/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Daftar Tamu', link: '/admin/daftartamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/admin/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/admin/laporan', icon: <SummarizeRoundedIcon /> },
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
    opacity: popupClose ? 0 : 1,
    transform: popupClose ? 'translateY(-100%)' : 'translateY(0%)',
  });
  const handleClosePopup = () => {
    setPopupClose(true);
    setTimeout(() => {
      setPopupOpen(false);
      setPopupClose(false);
    }, 300); 
  };
  const popupTambahAnimation = useSpring({
    opacity: TambahOpen ? 1 : 0,
    transform: TambahOpen ? 'translateY(0%)' : 'translateY(-100%)',
  });
  const popupDeleteAnimation = useSpring({
    opacity: showDeletePopup ? 1 : 0,
    transform: showDeletePopup ? 'translateY(0%)' : 'translateY(-100%)',
  });
  const popupDeleteAnimationClosing = useSpring({
    opacity: closingDeletePopup ? 0 : 1,
    transform: closingDeletePopup ? 'translateY(-100%)' : 'translateY(0%)',
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
const handleDeleteClosePopup = () => {
  setClosingDeletePopup(true);
  setTimeout(() => {
    setShowDeletePopup(false);
    setClosingDeletePopup(false);
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
              <img src='/build/assets/images/logo.png' className="w-10" alt="Avatar" />
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
                <img className="rounded-full ml-2 mr-2" src="/build/assets/images/profil.png" width="24" height="24" alt="User 01" />
                Admin
              </button>
                <animated.ul style={navbarAnimation} className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
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
                </animated.ul>
            </div>
          </div>
        </div>
        <div className='overflow-auto'>
          <div className="flex p-8">
             <GroupRoundedIcon style={{fontSize:'40px', marginRight:'8px'}}/>
            <h1 className='font-extrabold text-3xl'>Data Karyawan</h1>
          </div>
          <div className="container w-full md:w-auto md:ml-6 md:mr-6 overflow-x-auto shadow-md">
            <div id="recipients" className=" overflow-y-auto p-10 mt-6 lg:mt-0 rounded shadow bg-white">
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Cari karyawan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button onClick={handleSearch}  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
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
                  data={karyawan}
                  keyField="_id"
                  responsive={true}
                  striped={true}
                  hover={true}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20, karyawan.length]}
                  paginationRowsPerPageText="Tampilkan:"
                  responsiveLayout="scroll"
                  renderRowSubComponent={() => <div></div>}
                />
              </div>
            </div>
            {selectedRow && popupOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                < animated.div style={popupClose ? closingPopupAnimation : popupAnimation} className=" bg-white p-8 w-auto rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-center">Detail Karyawan</h2>
                  <div className='flex items-center justify-center'>
                    <label htmlFor="profile-picture-upload" className="relative inline-flex mb-4 items-center mr-5 cursor-pointer">
                      <input type="file" id="profile-picture-upload" name="profile-picture-upload" accept="image/*" className="hidden" />
                        <img className="rounded-full cursor-pointer" src="/build/assets/images/profil.png" width="64" height="64" alt="User 01" />
                    </label>
                  </div>
                  <div className=' grid items-center justify-center grid-cols-2 gap-2 '>
                    <div className="mb-2">Username: {selectedRow.username}</div>
                  <div className="mb-2">Nama: {selectedRow.user_name}</div>
                  <div className="mb-2">Email: {selectedRow.email}</div>
                  <div className="mb-2">NIK: {selectedRow.nik}</div>
                  <div className="mb-2">No Telpon: {selectedRow.no_tlp}</div>
                  <div className="mb-2">Jabatan: {selectedRow.jabatan}</div>
                  <div>Bidang: {selectedRow.bidang}</div>
                  <div className="mb-2">Password: {selectedRow.password}</div> 
                  <div className="mb-2">Alamat: {selectedRow.alamat}</div></div>
                  <div className='flex items-center justify-center'><button className="hover:bg-blue-700 bg-blue-600 w-full text-white px-4 py-2 rounded mt-4" onClick={handleClosePopup}>Close</button></div>
                  
                </animated.div>
              </div>
            )}
          {TambahOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <animated.div style={closingTambahPopup ? closingTambahPopupAnimation : popupTambahAnimation} className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
                  <CloseIcon onClick={handleTambahClosePopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <AddRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Tambah Data Karyawan</h1>
                  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                      <input type="text" id="username" name='username' value={formData.username} onChange={handleInputChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="username" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama</label>
                      <input type="text" id="user_name" name='user_name' value={formData.user_name} onChange={handleInputChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="user_name" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" id="email" name='email' value={formData.email} onChange={handleInputChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="email" required/>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                      <input name='nik' value={formData.nik} onChange={handleInputChange} type="text" id="NIK" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="NIK" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telpon</label>
                      <input name='no_tlp' value={formData.no_tlp} onChange={handleInputChange} type="text" id="no.telpon" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="No. Telpon " required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jabatan</label>
                      <input type="text" name='jabatan' value={formData.jabatan} onChange={handleInputChange} id="jabatan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Jabatan" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                      <input name='bidang' value={formData.bidang} onChange={handleInputChange} type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Bidang" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                      <input type="text" id="alamat" name='alamat' value={formData.alamat} onChange={handleInputChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="alamat" required/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tujuan</label>
                      <select  name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500">
                        <option value="">Pilih Tipe User</option>
                        <option value="pegawai">Petugas</option>
                        <option value="operator">Operator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>    
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                      <input name='password' value={formData.password} onChange={handleInputChange} type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="password" required/>
                    </div>
                    <button type="reset" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
                  </form>
                </animated.div>
              </div>
            )}
          {EditOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                < animated.div style={closingEditPopup ? closingEditPopupAnimation : popupEditAnimation } className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] w-full relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
                  <CloseIcon onClick={handleEditClosePopup} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
                  <div className="md:flex flex justify-center items-center">
                  <EditRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Edit Data Karyawan</h1>
                  <form onSubmit={handleSubmitUpdate} className="grid grid-cols-2 gap-4">
                     <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                      <input type="text" id="username"  name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.username}/>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama</label>
                      <input type="text" id="user_name" name='user_name' value={formData.user_name} onChange={(e) => setFormData({ ...formData, user_name: e.target.value })} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.user_name} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" id="email" name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.email} />
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                      <input name='nik' value={formData.nik } onChange={(e) => setFormData({ ...formData, nik: e.target.value })} type="text" id="NIK" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.nik} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telpon</label>
                      <input name='no_tlp' value={formData.no_tlp} onChange={(e) => setFormData({ ...formData, no_tlp: e.target.value })} type="text" id="no.telpon" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.no_tlp} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jabatan</label>
                      <input type="text" name='jabatan' value={formData.jabatan } onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })} id="jabatan" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.jabatan} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                      <input name='bidang' value={formData.bidang} onChange={(e) => setFormData({ ...formData, bidang: e.target.value })}type="text" id="bidang" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.bidang} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                      <input type="text" id="alamat" name='alamat' value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={selectedRow.alamat} />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tujuan</label>
                      <select  name="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder={selectedRow.role}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500">
                        <option value="">Pilih Tipe User</option>
                        <option value="pegawai">Petugas</option>
                        <option value="operator">Operator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>  
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                      <input name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="password" />
                    </div>
                    <button type="reset" className="button-masuk col-span-2 md:col-span-3 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
                    <button type="submit" className="button-masuk col-span-2 md:col-span-3 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
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
            {showDeletePopup && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <animated.div style={ closingDeletePopup? popupDeleteAnimationClosing : popupDeleteAnimation} className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Hapus Data Karyawan</h2>
                <p>Apakah Anda yakin ingin menghapus data karyawan {selectedRow.nama}?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      deleteKaryawan(selectedRow.id);
                      closeDeletePopup();
                    }}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleDeleteClosePopup}
                  >
                    Batal
                  </button>
                </div>
              </animated.div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKaryawan;