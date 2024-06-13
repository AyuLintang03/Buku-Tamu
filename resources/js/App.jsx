import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/frontend/Home';
import Dashboard from '../views/frontend/Admin/Dashboard';
import DataKaryawan from '../views/frontend/Admin/DataKaryawan';
import DaftarTamu from '../views/frontend/Admin/DaftarTamu';
import BukuTamu from '../views/frontend/Admin/BukuTamu';
import Laporan from '../views/frontend/Admin/Laporan';
import PrintLaporan from '../views/frontend/Admin/PrintLaporan';
import DashboardPetugas from '../views/frontend/Petugas/Dashboard';

export default function App() {
  return (
    <Router>
      <div className=" max-w-full h-screen " style={{ backgroundColor: '#DFF5FF'}}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard usersCount={10} tamuTundaCount={5} tamuTotalCount={20} />} />
          <Route path="/admin/datakaryawan" element={<DataKaryawan />} />
          <Route path="/admin/daftartamu" element={<DaftarTamu />} />
          <Route path="/admin/bukutamu" element={<BukuTamu />} />
          <Route path="/admin/laporan" element={<Laporan />} />
          <Route path="/admin/laporan/printlaporan" element={<PrintLaporan />} />
          <Route path="/operator/dashboard" element={<DashboardPetugas />} />
        </Routes>
      </div>
    </Router>
  )
}
