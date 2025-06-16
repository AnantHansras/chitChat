import React, { useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import logo from '../assets/image.png';
import UserComponent from './UserComponent';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion'
import { fetchUsers } from '../services/userAPI';


const AllUsers = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const [search,setSearch] = useState("");
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const [users, setUsers] = useState([]); 
  const handleOnClick = async (e) =>{
    e.preventDefault();
    const fetchedUsers = await dispatch(fetchUsers(token, search));
    
    setUsers(fetchedUsers.data);
  }
  useEffect(() => {
    const fetchData = async () => {
      
        const fetchedUsers = await dispatch(fetchUsers(token, search));
        setUsers(fetchedUsers.data); 
      
    };

    fetchData(); 
  }, [search]);

  return (
    <AnimatePresence>
        <motion.div
          initial={ {opacity:0,scale:0} }
          animate={ {opacity:1,scale:1} }
          exit={ {opacity:0,scale:0} }
          transition={{duration:'0.5'}}
          className={`flex-1 md:flex-[0.7] flex flex-col ${
            darkMode ? ' text-gray-300' : ' text-[#0000008F]'
          }`}
          
        >
          {/* Icons */}
          <div
            className={`flex flex-row justify-start md:space-x-7 space-x-1 items-center rounded-2xl mb-1 p-2 m-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
          {
        isMobile ? (<IconButton onClick={() => {isMobile ? navigate('/') : navigate('/')}} color="inherit" className='opacity-60 h-8'>
        <Tooltip title="Home" placement="top" arrow><HomeIcon /></Tooltip>
        </IconButton>) : (<img src={logo} className="opacity-70 h-8" />)
      }
            
            <div className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-[#0000008A] '}`}>
              All Available Users
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={` flex flex-row items-center rounded-2xl m-3 my-1 ${
              darkMode ? 'bg-gray-800' : ' bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            <IconButton onClick={handleOnClick} color="inherit" className='opacity-60'>
              <SearchIcon  />
            </IconButton>
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Users by their name"
              className={`ml-2 mb-1 text-lg w-[70%] border-none outline-none ${
                darkMode ? 'bg-gray-800 text-gray-300' : ''
              }`}
            />
          </div>

          {/* Friends */}
          <div className="rounded-2xl flex-1 m-3 mt-1 mb-4  overflow-y-auto" 
          style={{
          scrollbarWidth: 'none', 
      msOverflowStyle: 'none', 
      WebkitOverflowScrolling: 'touch', 
        }}>
          {users.length > 0 ? (
                        users.map((user, index) => {
                          return ( <UserComponent key={index} friend={user}>
                                {/* Add additional user details if needed */}
                            </UserComponent>)
          })
                    ) : (
                        <div className="text-center text-2xl mt-5 text-gray-500">
                            No users found
                        </div>
                    )}
          </div>
        </motion.div>
    </AnimatePresence>
    
  );
};

export default AllUsers;
