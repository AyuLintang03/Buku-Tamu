import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Admin/Dashboard';
import DataKaryawan from './Components/Admin/DataKaryawan';
import DaftarTamu from './Components/Admin/DaftarTamu';
import BukuTamu from './Components/Admin/BukuTamu';
import Laporan from './Components/Admin/Laporan';
import DashboardPetugas from './Components/Petugas/Dashboard';
import DataKaryawanPetugas from './Components/Petugas/DataKaryawan';
import DaftarTamuPetugas from './Components/Petugas/DaftarTamu';
import BukuTamuPetugas from './Components/Petugas/BukuTamu';
import LaporanPetugas from './Components/Petugas/Laporan';
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
          <Route path='/petugas/datakaryawan' element={<DataKaryawanPetugas />} />
          <Route path='/petugas/Dashboard' element={<DashboardPetugas />} />
          <Route path='/Petugas/daftartamu' element={<DaftarTamuPetugas />} />
          <Route path='/Petugas/bukutamu' element={<BukuTamuPetugas />} />
          <Route path='/Petugas/laporan' element={<LaporanPetugas />} />
          <Route path='/daftartamu' element={<DaftarTamu />} />
          <Route path='/bukutamu' element={<BukuTamu />} />
          <Route path='/laporan' element={<Laporan />} />
        </Routes>
      </div>
    </Router>
  )
}
