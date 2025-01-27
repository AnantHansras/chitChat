import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion'
import { createGroup } from '../services/chatAPI';
const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const dispatch = useDispatch();
  const handleCreateGroup = () => {
    if (groupName) {
      dispatch(createGroup(groupName,token));
      setGroupName('')
    } else {
      alert('Please enter a group name.');
    }
  };

  return (
    <AnimatePresence>
        <motion.div initial={ {opacity:0,scale:0} }
          animate={ {opacity:1,scale:1} }
          exit={ {opacity:0,scale:0} }
          transition={{duration:'0.5'}}
        className="flex-[0.7] flex justify-center items-center ">
      <div
        className={`flex flex-col p-6 m-3 rounded-2xl w-96 ${
          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
        }`}
        style={{
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
        <h3 className="text-xl font-semibold mb-4 mx-auto">
          Create a Group
        </h3>
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Enter group name"
          className={`p-2 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-gray-700 border-gray-500 text-gray-300 focus:ring-green-500'
              : 'bg-white border-gray-300 focus:ring-green-500'
          }`}
        />
        <button
          onClick={handleCreateGroup}
          className={`bg-green-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none ${
            darkMode ? 'hover:bg-green-400' : 'hover:bg-green-600'
          }`}
        >
          Create Group
        </button>
      </div>
        </motion.div>
    </AnimatePresence>
    
  );
};

export default CreateGroup;

