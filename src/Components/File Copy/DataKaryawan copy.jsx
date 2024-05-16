import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const data = [
  { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, start_date: '2011/04/25', salary: '$320,800' },
  { id: 2, name: 'Donna Snider', position: 'Customer Support', office: 'New York', age: 27, start_date: '2011/01/25', salary: '$112,000' },
  // Add more data objects here
];

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    grow: 2, // Adjust the width of the column
  },
  {
    name: 'Position',
    selector: row => row.position,
    sortable: true,
    grow: 1, // Adjust the width of the column
  },
  {
    name: 'Office',
    selector: row => row.office,
    sortable: true,
    grow: 1, // Adjust the width of the column
  },
  {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
    grow: 1, // Adjust the width of the column
  },
  {
    name: 'Start Date',
    selector: row => row.start_date,
    sortable: true,
    grow: 1, // Adjust the width of the column
  },
  {
    name: 'Salary',
    selector: row => row.salary,
    sortable: true,
    grow: 1, // Adjust the width of the column
  },
  {
    name: 'Actions',
    cell: (row) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button className='bg-green-600 text-white px-2 py-2 rounded flex items-center hover:bg-green-700'>
                <EditRoundedIcon style={{ fontSize: '15px'}} />
                
            </button>
            <button className='bg-red-600 text-white px-2 py-2 rounded flex items-center hover:bg-red-700'>
                <DeleteForeverRoundedIcon style={{ fontSize: '15px'}}/>
            </button>
        </div>
    ),
    grow: 1, // Adjust the width of the column
  },
];

const DataKaryawan = () => { 
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, []);

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
    <div className="container w-full md:w-5/6 xl:w-4/5 mx-auto px-2"> {/* Adjusted container width */}
      <h1 className="flex items-center font-sans font-bold break-normal text-indigo-500 px-2 py-8 text-xl md:text-2xl">
        Data Karyawan
      </h1>
      <div id="recipients" className="p-10 mt-6 lg:mt-0 rounded shadow bg-white">
        <div className="flex items-center mb-4">
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
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded ml-auto hover:bg-green-600">
            Add
          </button>
        </div>
        <DataTable
          columns={columns}
          data={tableData}
          responsive={true}
          striped={true}
          hover={true}
          pagination={true}
          // Add more customization options here (refer to react-data-table-component docs)
        />
      </div>
      {showAddModal && (
        // Render your Add modal or form component here
        <div className="fixed inset-0  flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            {/* Your Add modal or form content */}
            <h2>Add New Entry</h2>
            {/* Example form fields */}
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Position" />
            <input type="text" placeholder="Office" />
            <button onClick={handleCloseAddModal}>Cancel</button>
            <button>Add</button>
          </div>
        </div>
      )}
    </div>  
  );
};

export default DataKaryawan;
