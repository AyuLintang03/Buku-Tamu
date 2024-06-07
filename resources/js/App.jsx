import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/frontend/Home';
import Dashboard from '../views/frontend/Admin/Dashboard';
import DataKaryawan from '../views/frontend/Admin/DataKaryawan';
import DashboardPetugas from '../views/frontend/Petugas/Dashboard';

export default function App() {
  return (
    <Router>
      <div className=" max-w-full h-screen " style={{ backgroundColor: '#DFF5FF'}}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/datakaryawan" element={<DataKaryawan />} />
          <Route path="/operator/dashboard" element={<DashboardPetugas />} />
        </Routes>
      </div>
    </Router>
  )
}
