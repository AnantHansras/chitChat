import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {addSelfToGroup} from '../services/chatAPI'
const GroupComponent = ({ friend }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const handleOnClick = (e) =>{
    e.preventDefault();
    dispatch(addSelfToGroup(friend._id,token,navigate));
    navigate('/main/chat/' + friend._id + '&' + friend.chatName + '&' + friend.isGroupChat)
  }
  return (
    <div
      className={`grid grid-cols-[40px_auto_auto] gap-x-4 items-center rounded-2xl m-2 p-2 ${
        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-[#0000008F]'
      }`}
      style={{
        boxShadow:
          '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Initial Avatar */}
      <p
        className={`col-start-1 h-10 w-10 flex justify-center items-center rounded-full text-white text-2xl font-bold ${
          darkMode ? 'bg-gray-600' : 'bg-[#d9d9d9]'
        }`}
      >
        {friend.chatName[0]}
      </p>

      {/* Friend Name */}
      <p className={`col-start-2 mb-1 ml-2 font-semibold truncate ${darkMode ? 'text-gray-300' : 'text-[#0000008F]'}`}>
        {friend.chatName}
      </p>

      {/* Message Button */}
      <button
        className={`col-start-3 text-white text-sm px-4 py-1 w-40 justify-self-end rounded-lg ${
          darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-700'
        } transition`}
        onClick={handleOnClick}
      >
        Open
      </button>
    </div>
  );
};

export default GroupComponent;