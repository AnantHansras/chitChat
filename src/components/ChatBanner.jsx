import React from 'react'
import { useSelector} from 'react-redux';
const ChatBanner = () => {
    const darkMode = useSelector((state) => state.darkMode.isDarkMode);
    return (
        <div
        className={`flex items-center justify-center py-2 px-1 text-xs rounded-lg mx-2 my-4 text-center ${
          darkMode
            ? "bg-yellow-200 text-yellow-900 opacity-70"
            : "bg-yellow-200 text-yellow-900 opacity-90"
        } border border-yellow-300`}
      >
        <span>
          Welcome to <b>ChitChat</b>! 👋 Your conversations are secure, and only you and your friends can see them. Enjoy seamless chatting!
        </span>
      </div>
      
    );
  };
  
  export default ChatBanner;
  