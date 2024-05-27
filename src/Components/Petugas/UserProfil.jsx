import React, { useState } from 'react';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useSpring, animated } from 'react-spring';

const UserProfile = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false); 
    const [editClosing, setEditClosing] = useState(false); 
    const [selectedImage, setSelectedImage] = useState(null); 

    const openEditModal = () => {
        setEditOpen(true);
    };

    const closeEditModal = () => {
        setEditOpen(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };
    const OpenAnimation = useSpring({
        opacity: editOpen ? 1 : 0,
        transform: editOpen ? 'translateY(0%)' : 'translateY(-100%)',
    });
    const CloseAnimation = useSpring({
        opacity: editClosing ? 1 : 0,
        transform: editClosing ? 'translateY(-100%)' : 'translateY(0%)',
    });
    const handleClosingEdit = () =>{
        setEditClosing(true);
        setTimeout(() => {
            setEditOpen(false);
            setEditClosing(false);
        }, 300);
    }
    return (
        <section className="flex flex-col justify-center antialiased text-gray-600 min-h-screen p-4">
            <div className="h-full">
                {/* Card */}
                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <div className="flex flex-col h-full">
                        {/* Card top */}
                        <div className="flex-grow p-5">
                            <div className="flex justify-between items-start">
                                {/* Image + name */}
                                <header>
                                    <div className="flex mb-2">
                                        {/* Profile Picture */}
                                        <label htmlFor="profile-picture-upload" className="relative inline-flex items-start mr-5 cursor-pointer">
                                            <div className="absolute top-0 right-0 -mr-2 bg-white rounded-full shadow" aria-hidden="true">
                                                <svg className="w-8 h-8 fill-current text-yellow-500" viewBox="0 0 32 32">
                                                    <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                                                </svg>
                                            </div>
                                            <img className="rounded-full cursor-pointer" src="/src/assets/image/profil.png" width="64" height="64" alt="User 01" />
                                        </label>
                                        <div className="mt-1 pr-1">
                                            <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                                <h2 className="text-xl leading-snug justify-center font-semibold">Petugas</h2>
                                            </a>
                                            <div className="flex items-center"><span className="text-sm font-medium text-gray-400 -mt-0.5 mr-1">Petugas</span></div>
                                        </div>
                                    </div>
                                </header>
                            </div>
                            {/* Bio */}
                            <div className="mt-2 flex items-center">
                                <BusinessRoundedIcon fontSize="small" />
                                <div className="text-sm ml-1">DKP LAMPUNG</div>
                            </div>
                            <div className="mt-2 flex items-center">
                                <EmailRoundedIcon fontSize="small" />
                                <div className="text-sm ml-1">petugas@gmail.com</div>
                            </div>
                        </div>
                        {/* Card footer */}
                        <div className="border-t border-gray-200">
                            <div className="flex divide-x divide-gray-200r">
                                <a className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4" href="#0">
                                    <div className="flex items-center justify-center">
                                        <KeyboardReturnRoundedIcon style={{marginRight:'8px'}}/>
                                        <span>Kembali</span>
                                    </div>
                                </a>
                                <a className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group" href="#0" onClick={openEditModal}>
                                    <div className="flex items-center justify-center">
                                        <EditRoundedIcon style={{marginRight:'8px'}}/>
                                        <span>Edit Profile</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Profile Modal */}
            {editOpen && (
                <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <animated.div style={ editClosing ? CloseAnimation :OpenAnimation } className="bg-white p-8 rounded-lg shadow-lg">
                        {/* Your edit profile form goes here */}
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
                        <form>
                            {/* Form inputs */}
                            <div className='flex items-center justify-center'>
                            <label htmlFor="profile-picture-upload" className="relative inline-flex mb-4 items-center mr-5 cursor-pointer">
                                <input type="file" id="profile-picture-upload" name="profile-picture-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
                                <img className="rounded-full cursor-pointer" src="/src/assets/image/profil.png" width="64" height="64" alt="User 01" />
                                <div className="absolute top-0 right-0 -mr-2 bg-white rounded-full shadow" aria-hidden="true">
                                    <FileUploadRoundedIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                </div>
                            </label></div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
                                <input type="text" id="username" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium">Nama</label>
                                <input type="text" id="name" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="nik" className="block text-gray-700 font-medium">NIK</label>
                                <input type="text" id="nik" name="nik" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nohp" className="block text-gray-700 font-medium">No. Handphone</label>
                                <input type="number" id="nohp" name="nohp" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jabatan" className="block text-gray-700 font-medium">Jabatan</label>
                                <input type="text" id="jabatan" name="jabatan" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bidang" className="block text-gray-700 font-medium">Bidang</label>
                                <input type="text" id="bidang" name="bidang" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                                <input type="number" id="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                        </div>
                            {/* Submit button */}
                            <div className="flex justify-center">
                                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                                <button type="button" className="ml-2 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100" onClick={handleClosingEdit}>Cancel</button>
                            </div>
                        </form>
                    </animated.div>
                </div>
            )}
        </section>
    );
};

export default UserProfile;
