import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const DataKaryawan = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    role: 'operator',
    email: '',
    password: '',
  });

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const fetchKaryawan = async () => {
    try {
      const response = await fetch('/user/datakaryawan', {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('/user/datakaryawan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Lanjutkan dengan penanganan respons yang berhasil
  } catch (error) {
    console.error('Error adding karyawan:', error);
    alert('Terjadi kesalahan saat menambahkan data karyawan.');
  }
};
  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Username', selector: (row) => row.username },
    { name: 'Role', selector: (row) => row.role },
    { name: 'Email', selector: (row) => row.email },
  ];

  return (
    <div>
      <DataTable
        title="Data Karyawan"
        columns={columns}
        data={karyawan}
        pagination
        selectableRows
      />

      <h2>Tambah Karyawan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Tambah Karyawan</button>
      </form>
    </div>
  );
};

export default DataKaryawan;