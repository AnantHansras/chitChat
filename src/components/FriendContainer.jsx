import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming darkMode is in Redux store

const FriendContainer = ({ friend,chatName }) => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access darkMode state
  function formatWhatsAppStyle(dateString) {
    const date = new Date(dateString); // Convert input string to Date object
    const now = new Date(); // Current date and time
    
    const isSameDay = (date1, date2) =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  
    const isYesterday = (date1, date2) => {
      const yesterday = new Date(date2);
      yesterday.setDate(yesterday.getDate() - 1);
      return isSameDay(date1, yesterday);
    };
  
    if (isSameDay(date, now)) {
      // If the date is today, return time in HH:MM format
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday(date, now)) {
      // If the date is yesterday, return "Yesterday"
      return "Yesterday";
    } else {
      // Otherwise, return the date in DD/MM/YYYY format
      return date.toLocaleDateString();
    }
  }
  return (
    <div
      className={`grid grid-cols-[40px_auto_auto] grid-rows-[20px_20px] gap-x-6 rounded-2xl m-2 cursor-pointer p-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
      }`}
      onClick={() => {
        navigate('chat/' + friend._id + '&' + chatName + '&' + friend.isGroupChat);
      }}
    >
      {/* Avatar */}
      <p
        className={`col-start-1 col-end-2 row-start-1 row-end-3 h-10 w-10 self-center flex justify-center items-center rounded-full text-white text-2xl font-bold ${
          darkMode ? 'bg-gray-600' : 'bg-[#d9d9d9]'
        }`}
      >
        {chatName[0]}
      </p>

      {/* Friend Name */}
      <p
        className={`row-start-1 col-start-2 col-end-4 font-semibold self-center ${
          darkMode ? 'text-gray-300' : 'text-[#0000008F]'
        }`}
      >
        {chatName}
      </p>

      {/* Last Message */}
      {
        friend.latestMessage && 
        <p
        className={`row-start-2 col-start-2 text-sm self-center ${
          darkMode ? 'text-gray-400' : 'text-[#0000008A]'
        }`}
      >
        {friend.latestMessage.content}
      </p>
      }
      {/* Last Message Time */}
      {
        friend.latestMessage && 
        <p
        className={`row-start-2 col-start-3 text-sm justify-self-end self-center ${
          darkMode ? 'text-gray-500' : 'text-[#00000066]'
        }`}
      >
      {formatWhatsAppStyle(friend.latestMessage.createdAt)}
       
      </p>
      }
      
      
    </div>
  );
};

export default FriendContainer;