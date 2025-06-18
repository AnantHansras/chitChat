import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { unseenCount } from '../services/chatAPI';
import { useDispatch } from 'react-redux';
import { refreshWeb } from '../slices/RefreshSlice';
import { IoIosInformationCircleOutline } from "react-icons/io";
const FriendContainer = ({ friend, chatName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.refresh.refresh);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  useEffect(() => {
    const fetchUnseenCount = async () => {
      
      const chatId = friend._id;
        const data = await dispatch(unseenCount(token, chatId));
        if (data && data.unseenMessageCount !== undefined) {
            setCount(data.unseenMessageCount);
        }
    };
    
    fetchUnseenCount();
}, [refresh]);

  function formatWhatsAppStyle(dateString) {
    const date = new Date(dateString);
    const now = new Date();

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
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday(date, now)) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    // <div
    //   className={`grid grid-cols-[40px_auto_auto] grid-rows-[20px_20px] gap-x-6 rounded-2xl m-2 cursor-pointer p-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
    //     darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
    //   }`}
    //   onClick={() => {
    //     navigate('chat/' + friend._id + '&' + chatName + '&' + friend.isGroupChat);
    //     setCount(0)
    //   }}
    // >
    //   {/* Avatar */}
    //   <p
    //     className={`col-start-1 col-end-2 row-start-1 row-end-3 h-10 w-10 self-center flex justify-center items-center rounded-full text-white text-2xl font-bold ${
    //       darkMode ? 'bg-gray-600' : 'bg-[#d9d9d9]'
    //     }`}
    //   >
    //     {chatName[0]}
    //   </p>

    //   {/* Friend Name */}
    //   <div className="row-start-1 col-start-2 col-end-4 flex items-center justify-between">
    //     <p
    //       className={`font-semibold self-center ${
    //         darkMode ? 'text-gray-300' : 'text-[#0000008F]'
    //       }`}
    //     >
    //       {chatName}
    //     </p>
    //     {/* Unseen Messages Count */}
    //     {count > 0 && (
    //       <div
    //         className="flex justify-center items-center h-5 w-5 bg-green-500 text-white text-xs  rounded-full"
    //       >
    //         {count}
    //       </div>
    //     )}
    //   </div>

    //   {/* Last Message */}
    //   {friend.latestMessage ? (
    //     <p
    //       className={`row-start-2 col-start-2 text-sm self-center ${
    //         darkMode ? 'text-gray-400' : 'text-[#0000008A]'
    //       }`}
    //     >
    //       {friend.latestMessage.content.length > 7
    //         ? friend.latestMessage.content.slice(0, 7) + '...'
    //         : friend.latestMessage.content}
    //     </p>
    //   ):(
    //     <p className={`row-start-2 col-start-2 text-sm self-center flex flex-row  gap-x-1 ${
    //         darkMode ? 'text-gray-400' : 'text-[#0000008A]'
    //       }`}><IoIosInformationCircleOutline className='text-md mt-1'/>No Conversation</p>
    //   )}

    //   {/* Last Message Time */}
    //   {friend.latestMessage && (
    //     <p
    //       className={`row-start-2 col-start-3 text-sm justify-self-end self-center ${
    //         darkMode ? 'text-gray-500' : 'text-[#00000066]'
    //       }`}
    //     >
    //       {formatWhatsAppStyle(friend.latestMessage.createdAt)}
    //     </p>
    //   )}
    // </div>
    <div
  className={`grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-x-4 rounded-2xl m-2 cursor-pointer p-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
    darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
  }`}
  onClick={() => {
    navigate('chat/' + friend._id + '&' + chatName + '&' + friend.isGroupChat);
    setCount(0);
  }}
>
  {/* Avatar */}
  <div
    className={`row-span-2 h-10 w-10 flex justify-center items-center rounded-full text-white text-xl font-semibold ${
      darkMode ? 'bg-gray-600' : 'bg-[#d9d9d9]'
    }`}
  >
    {chatName[0]}
  </div>

  {/* Friend Name and Message Count */}
  <div className="col-start-2 col-end-3 row-start-1 flex justify-between items-center">
    <p
      className={`font-semibold truncate ${
        darkMode ? 'text-gray-300' : 'text-[#000000de]'
      }`}
    >
      {chatName}
    </p>
    {count > 0 && (
      <div className="h-5 w-5 flex items-center justify-center bg-green-500 text-white text-xs rounded-full">
        {count}
      </div>
    )}
  </div>

  {/* Last Message */}
  <div className="col-start-2 row-start-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
    {friend.latestMessage ? (
      <p
        className={`truncate ${
          darkMode ? 'text-gray-400' : 'text-[#0000008a]'
        }`}
      >
        {friend.latestMessage.content.length > 7
          ? friend.latestMessage.content.slice(0, 7) + '...'
          : friend.latestMessage.content}
      </p>
    ) : (
      <p
        className={`flex items-center gap-x-1 ${
          darkMode ? 'text-gray-400' : 'text-[#0000008a]'
        }`}
      >
        <IoIosInformationCircleOutline className="text-md mt-[1px]" />
        No Conversation
      </p>
    )}
  </div>

  {/* Timestamp */}
  {friend.latestMessage && (
    <p
      className={`col-start-3 row-start-2 text-sm justify-self-end self-center ${
        darkMode ? 'text-gray-500' : 'text-[#00000066]'
      }`}
    >
      {formatWhatsAppStyle(friend.latestMessage.createdAt)}
    </p>
  )}
</div>

  );
};

export default FriendContainer;
