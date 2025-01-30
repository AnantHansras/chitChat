import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import logo from '../assets/image.png';
import { useSelector,useDispatch } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion'
import { useState,useEffect } from 'react';
import { fetchGroups } from '../services/chatAPI';
import GroupComponent from './GroupComponent';

const Groups = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const [search,setSearch] = useState("");
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const [groups, setGroups] = useState([]);
  

  const handleOnClick = async (e) =>{
      e.preventDefault();
      const fetchedGroups = await dispatch(fetchGroups(token, search));
      setGroups(fetchedGroups.data);
  }
  useEffect(() => {
      const fetchData = async () => {
        const fetchedGroups = await dispatch(fetchGroups(token, search));
        setGroups(fetchedGroups.data);
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
          className={`flex-[0.7] flex flex-col ${
            darkMode ? ' text-gray-300' : 'text-[#0000008F]'
          }`}
        >
          {/* Icons */}
          <div
            className={`flex flex-row justify-start space-x-7 items-center rounded-2xl mb-1 p-2 m-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            <img src={logo} className="opacity-70 h-8" />
            <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-[#0000008A]'}`}>
              All Available Groups
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={` flex flex-row items-center rounded-2xl m-3 my-1 ${
              darkMode ? ' bg-gray-800' : ' bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            <IconButton color="inherit" className='opacity-60' onClick={handleOnClick}>
              <SearchIcon  />
            </IconButton>
            <input
            name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for Groups"
              className={`ml-2 mb-1 w-[70%] text-lg border-none outline-none ${
                darkMode ? 'bg-gray-800 text-gray-300' : ''
              }`}
            />
          </div>

          {/* Friends */}
          <div className="rounded-2xl flex-1 m-3 my-1">
          {groups.length > 0 ? (
            groups.map((group, index) => (
              group.chatName && <GroupComponent key={index} friend={group}>
                                {/* Add additional user details if needed */}
                            </GroupComponent>
                        ))
                    ) : (
                        <div className="text-center mt-5 text-2xl text-gray-500">
                            No group found
                        </div>
                    )}
          </div>
        </motion.div>
    </AnimatePresence>
    
  );
};

export default Groups;
