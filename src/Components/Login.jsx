import React from 'react';
import '../assets/Style/style.css';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full"  style={{ backgroundColor: '#DFF5FF'}}>
        <div className=" bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
            <div className="md:flex justify-center items-center">
                <img src='/src/assets/image/logo.png' className=" w-[40px]" alt="Avatar" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-4 mt-2 text-black">DKP LAMPUNG</h1>
            <form action="#">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Username" required/>
                </div>
                <div className="mb-4">
                    <label  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Masukan password" required/>
                   
                </div>
                <div className="flex items-center justify-between mb-4">
                   
                </div>
                <button type="submit" className=" button-masuk w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Masuk</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
