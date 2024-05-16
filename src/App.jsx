import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Admin/Dashboard';
import DataKaryawan from './Components/Admin/DataKaryawan';
import FormEditKaryawan from './Components/Form/FormEditKaryawan';
import FormTambahKaryawan from './Components/Form/FormTambahKaryawan';
import FormEditTamu from './Components/Form/FormEditTamu';
import FormTambahTamu from './Components/Form/FormTambahTamu';
import DaftarTamu from './Components/Admin/DaftarTamu';
import BukuTamu from './Components/Admin/BukuTamu';
import Laporan from './Components/Admin/Laporan';
import UserProfil from './Components/UserProfil';

export default function App() {
  return (
    <Router>
      <div className=" max-w-full h-screen " style={{ backgroundColor: '#DFF5FF'}}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userprofil' element={<UserProfil />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/datakaryawan' element={<DataKaryawan />} />
          <Route path='/formeditkaryawan' element={<FormEditKaryawan />} />
          <Route path='/formtambahkaryawan' element={<FormTambahKaryawan />} />
          <Route path='/formedittamu' element={<FormEditTamu />} />
          <Route path='/formtambahtamu' element={<FormTambahTamu />} />
          <Route path='/daftartamu' element={<DaftarTamu />} />
          <Route path='/bukutamu' element={<BukuTamu />} />
          <Route path='/laporan' element={<Laporan />} />
        </Routes>
      </div>
    </Router>
  )
}
