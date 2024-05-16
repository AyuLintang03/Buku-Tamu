import React from 'react';
import '../../assets/Style/style.css';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseIcon from '@mui/icons-material/Close';

const FormEditKaryawan = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full" style={{ backgroundColor: '#DFF5FF'}}>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl md:w-[800px] relative"> {/* Atur nilai max-w-xl atau max-w-3xl */}
        <CloseIcon className="absolute top-2 right-2 cursor-pointer" style={{ color: 'red' }} />
        <div className="md:flex justify-center items-center">
         <EditRoundedIcon style={{backgroundColor:'green', color:'white',borderRadius: '30%', width:'50px', height:'50px',padding:'10px'}}/>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">Edit Data Karyawan</h1>
        <form action="#" className=" grid grid-cols-2 gap-4">
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
          <div></div>
          <button type="reset" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reset</button>
          <button type="submit" className="button-masuk col-span-2 md:col-span-1 w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default FormEditKaryawan;
