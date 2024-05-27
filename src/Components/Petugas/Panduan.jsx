import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { useSpring, animated } from 'react-spring';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import '../../assets/Style/style.css';
const localizer = momentLocalizer(moment);

const Panduan = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slides, setSlides] = useState([
    { image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80' },
    { image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' },
  ]);

  const formattedDateTime = moment().format('DD/MM/YYYY HH:mm');
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    console.log('Logged out');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? slides.length : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length ? 1 : prevSlide + 1));
  };

  const Links = [
    { name: 'Dashboard', link: '/petugas/dashboard', icon: <DashboardRoundedIcon /> },
    { name: 'Data Karyawan', link: '/petugas/datakaryawan', icon: <GroupRoundedIcon /> },
    { name: 'Daftar Tamu', link: '/petugas/daftartamu', icon: <GroupsRoundedIcon /> },
    { name: 'Buku Tamu', link: '/petugas/bukutamu', icon: <ClassRoundedIcon /> },
    { name: 'laporan', link: '/petugas/laporan', icon: <SummarizeRoundedIcon /> },
    { name: 'panduan', link: '/petugas/panduan', icon: <AutoStoriesRoundedIcon /> },
  ];

  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? 240 : 0,
    opacity: isSidebarOpen ? 1 : 0,
  });
  const navbarAnimation = useSpring({
    height: isDropdownOpen ? 90 : 0,
    opacity: isDropdownOpen ? 1 : 0,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
        <animated.div style={sidebarAnimation} className="flex-none w-64 bg-gray-800 text-white overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col mt-6">
            <div className='flex items-center ml-2 mb-8'>
              <img src='/src/assets/image/logo.png' className="w-10" alt="Avatar" />
              <span className="text-xl font-bold ml-2">DKP Lampung</span>
            </div>
            {Links.map((link) => (
              <li className={`py-2 hover:bg-gray-700 ${link.link === activePage ? 'bg-gray-700' : ''}`} key={link.name}>
                <Link
                  to={link.link}
                  className={`flex items-center pl-4 ${
                    link.name === 'Home' ? 'marker bg-slate-700 h-1 w-4 rounded-full text-white' : ''
                  }`}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </animated.div>
      {/* End of Sidebar */}
      <div className="flex flex-col w-full md:w-auto flex-1">
        <div className="flex justify-between items-center shadow-md bg-gray-800 text-white py-4 px-4">
          <div className="flex items-center">
            <button className="focus:outline-none mr-4" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
          </div>
          <div className="flex items-center z-50 relative">
            <div className="text-sm text-gray-400 mr-6 ml-6">{formattedDateTime}</div>
            <div className="relative">
              <button className="flex items-center mr-4 pl-4 focus:outline-none" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img className="rounded-full ml-2 mr-2" src="/src/assets/image/profil.png" width="24" height="24" alt="User 01" />
                Petugas
              </button>
                <animated.ul style={navbarAnimation} className="absolute right-0 top-full mt-1 bg-gray-800 text-white rounded shadow-md">
                  <li className="py-2 hover:bg-gray-700">
                    <Link to="/Petugas/UserProfil">
                      <button className="flex items-center pl-4 pr-2 focus:outline-none" onClick={handleLogout}>
                        <Person2RoundedIcon className="mr-2" />
                        Profil
                      </button>
                    </Link>
                  </li>
                  <li className="py-2 hover:bg-gray-700">
                    <button className="flex items-center pl-4 pr-2 focus:outline-none" onClick={handleLogout}>
                      <ExitToAppIcon className="mr-2" />
                      Logout
                    </button>
                  </li>
                </animated.ul>
            </div>
          </div>
        </div>
        <div className='md:overflow-hidden h-full overflow-auto ml-13'>
          <div className="flex p-8">
            <AutoStoriesRoundedIcon style={{ fontSize: '40px', marginRight: '8px' }} />
            <h1 className='font-extrabold text-3xl'>Panduan</h1>
          </div>
          <div className="flex flex-wrap justify-center md:mt-2 md:ml-8 md:mr-8 relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`bg-white max-w-1/5 max-h-[26rem] md:mr-4 mb-4 rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${index + 1 === currentSlide ? 'z-10' : 'hidden'}`}
              >
                <div className='flex flex-col items-center justify-center h-full'>
                  <img className='h-full w-full object-cover' src={slide.image} alt={slide.name} />
                </div>
                
            <div
              className="rounded-full p-1 ml-2 absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 cursor-pointer"
              onClick={handlePrev}
              style={{background:'rgba(255,255,255,0.3)'}}
            >
              <ArrowBackIosNewRoundedIcon className="text-white mr-1 mb-1" />
            </div>
            <div
              className="rounded-full p-1 mr-2 absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 cursor-pointer"
              onClick={handleNext}
              style={{background:'rgba(255,255,255,0.3)'}}
            >
              <ArrowForwardIosRoundedIcon className="text-white mr-1 mb-1" />
            </div>
            {/* Bullet points */}
            <div className="absolute  items-center left-1/2 transform -translate-x-1/2 -translate-y-12  flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-1 rounded-md ${index + 1 === currentSlide ? 'bg-gray-100' : 'bg-gray-500'}`}
                  style={{ backgroundColor: index + 1 === currentSlide ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)' }}
                ></div>
              ))}
            </div>
              </div>
            ))}
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Panduan;
