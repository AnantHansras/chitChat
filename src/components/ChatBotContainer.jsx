import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bot } from 'lucide-react';
import { useState } from 'react';
const ChatbotContainer = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const botName = "Nova AI";
  const lastMessage = "Ask me anything.";
  const lastActive = "Available now"; // Or use a timestamp logic if needed

  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-x-4 rounded-2xl m-2 cursor-pointer p-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'
      }`}
      onClick={() => navigate('/chatbot')} // Route to chatbot
    >
      {/* Avatar */}
      <div
  className={`
    row-span-2
    h-12 w-11
    flex justify-center items-center
    rounded-full
    text-white text-xl font-semibold
    shadow-md
    ${darkMode ? 'bg-gradient-to-br from-purple-600 to-indigo-500' : 'bg-gradient-to-br from-purple-400 to-indigo-300'}
    hover:scale-105 transition-transform duration-300 ease-out
  `}
>
  <Bot size={24} />
</div>

      {/* Bot Name */}
      <div className="col-start-2 row-start-1 flex justify-between items-center">
        <p
          className={`font-semibold truncate ${
            darkMode ? 'text-gray-300' : 'text-[#000000de]'
          }`}
        >
          {botName}
        </p>
      </div>

      {/* Last Message */}
      <div className="col-start-2 row-start-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
        <p className={`${darkMode ? 'text-gray-400' : 'text-[#0000008a]'}`}>
          {lastMessage}
        </p>
      </div>

      {/* Status or Time */}
      <p
        className={`col-start-3 row-start-2 text-sm justify-self-end self-center ${
          darkMode ? 'text-gray-500' : 'text-[#00000066]'
        }`}
      >
        {lastActive}
      </p>
    </div>
  );
};

export default ChatbotContainer;
