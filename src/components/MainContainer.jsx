import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`min-w-[90%] h-[90vh] my-5 flex flex-row rounded-3xl ${
        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-[#f4f5f8]'
      }`}
      style={{
        boxShadow:
          '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      }}
    >
    {/* <div className='top-0 fixed left-0 right-0 h-1 bg-green-400'></div> */}
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainContainer;
