import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Style/style.css';

import MenuIcon from '@mui/icons-material/Menu';

const LoginPopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <div className="md:flex justify-center items-center">
            <img src='/src/assets/image/logo.png' className=" w-[40px]" alt="Avatar" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">DKP LAMPUNG</h1>
        <form action="#">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Masukan username" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Masukan password" required />
          </div>
          <button type="submit" className="button-masuk w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Masuk</button>
        </form>
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`w-full fixed left-0 right-0`}>
      <div className='md:flex shadow-md justify-between items-center bg-white py-6 md:px-10 px-7'>
        <div className="md:flex flex justify-between items-center">
          <div className="flex items-center">
            <img src='/src/assets/image/logo.png' className="ml-2 mr-2 w-[40px]" alt="Avatar" />
            <h1 className="font-bold">DKP LAMPUNG</h1>
          </div>
          <div className="md:hidden justify-end flex">
            <MenuIcon onClick={toggleMenu} className="cursor-pointer" />
          </div>
        </div>
        <ul className={`md:flex flex items-center w-full bg-white md:items-center md:pb-0 pb-2 absolute md:static md:z-auto right-0 md:w-auto md:pr-0 md:pl-0 md:pt-0 pt-8 pr-2 pl-2 transition-all duration-500 ease-in ${isMenuOpen ? '' : 'hidden'}`}>
          <button onClick={toggleLoginPopup} className="button-masuk w-full text-white font-bold py-2 px-4 rounded">
            Masuk
          </button>
        </ul>
      </div>
      <div className="md:flex justify-center items-center mt-40 px-4 md:px-10 text-center">
        <h1 className="text-4xl md:text-6xl text-center font-bold mb-6">Selamat Datang!</h1>
      </div>
      <p className="text-base md:text-lg text-center mt-6">Panel Buku Tamu adalah tempat di mana Anda dapat mengelola</p>
      <p className="text-base md:text-lg text-center mt-2"> dan memantau interaksi pengguna dengan website Anda secara langsung.</p>

      <div className='posisi md:flex md:mt-60 '>
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      {/* Render the login popup component */}
      {isLoginOpen && <LoginPopup onClose={toggleLoginPopup} />}
    </div>
  );
};

export default Home;
