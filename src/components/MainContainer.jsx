import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {useEffect,useRef} from 'react'
import { refreshWeb } from '../slices/RefreshSlice';
import { io } from "socket.io-client";
const ENDPOINT = "https://chitchat-backend-22lq.onrender.com";
const MainContainer = () => {
  const dispatch = useDispatch();
  const socketRef = useRef();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(ENDPOINT);

      // Emit setup event
      socketRef.current.emit("setup", user);
      // console.log("Socket setup sent:", user);

    }

  }, []);
  useEffect(() => {
      const handleRefresh = () => {
        dispatch(refreshWeb());
      };
      if (socketRef.current) {
        // Add the listener
        socketRef.current.on("refresh", handleRefresh);
        console.log("Refresh listener added");
      }
    
      return () => {
        if (socketRef.current) {
          // Clean up the listener to avoid duplicates
          socketRef.current.off("refresh", handleRefresh);
          
        }
      };
    }, [dispatch]);
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
