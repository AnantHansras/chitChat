import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../assets/image.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Selfmsg from './Selfmsg';
import Othermsg from './Othermsg';
import { allbotmsgs, chatbotReply, sendbotdmsg } from '../services/msgAPI';
import { useDispatch } from 'react-redux';
import SelfBotmsg from './SelfBotmsg.jsx';
import OtherBotmsg from './OtherBotmsg.jsx';
import { Bot } from 'lucide-react';
// import { sendToNovaAI } from '../services/aiAPI'; // You need to define this

const BotChatArea = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [msg, setMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const messagesEndRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh,setrefresh] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
      const fetchMessages = async () => {
        try {
          const messages = await dispatch(allbotmsgs(token));
          setAllMsg(messages.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
  
      fetchMessages();
    }, [ dispatch, token,refresh]);
  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!msg.trim() && !attachment) return;
    
    await dispatch(sendbotdmsg(msg, attachment, token));
    setrefresh(!refresh);
    setMsg('');
    setAttachment(null);

    //Send message to Nova AI
    setIsGenerating(true);
    try {
      const res = await dispatch(chatbotReply(msg, token)); 
      setrefresh(!refresh);
    } catch (err) {
      console.error("Error talking to Nova AI:", err);
    }
    setIsGenerating(false);

  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, 
        scale: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col h-100 flex-1 md:flex-[0.7] ${
          darkMode ? 'text-gray-300' : ''
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between m-3 mb-1 p-2 rounded-2xl ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
          }`}
          style={{ boxShadow: '0 8px 10px -6px rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div
  className={`
    row-span-2
    h-12 w-12
    flex justify-center items-center
    rounded-full
    text-white text-xl font-semibold
    shadow-md
    ${darkMode ? 'bg-gradient-to-br from-purple-700 to-indigo-600' : 'bg-gradient-to-br from-purple-400 to-indigo-300'}
    hover:scale-105 transition-transform duration-300 ease-out
  `}
>
  <Bot size={24} />
</div>
            <p className="text-xl font-bold">Nova AI</p>
          </div>
          <Tooltip title="Home" placement="top" arrow>
            <IconButton onClick={() => navigate('/')} className="opacity-60" color="inherit">
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </div>

        {/* Chat Area */}
        <div
          className={`rounded-2xl m-3 my-1 p-2 flex-1 overflow-y-auto relative flex flex-col ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {allMsg.map((msg, index) =>
            user.sub == msg.sender.auth0Id ? (
              <SelfBotmsg
                key={index}
                content={msg.content}
                time={msg.createdAt}
                imageUrl={msg.imageUrl}
              />
            ) : (
              <OtherBotmsg
                key={index}
                sender="Nova AI"
                content={msg.content}
                time={msg.createdAt}
              />
            )
          )}
          {isGenerating && (
  <div className="flex flex-col items-start">
    <div className="relative">
      <div
        className={`flex flex-col rounded-3xl max-w-80 mr-auto w-fit m-2 p-2 px-4 gap-0 space-y-0 ${
          darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-900"
        }`}
      >
        <div
          className="mb-0 text-sm font-bold"
          style={{ color: "#33FF57" }}
        >
          Nova AI
        </div>

        <div
          className={`text-md mb-0 ${
            darkMode ? "text-gray-200" : "text-gray-900"
          } flex`}
        >
          Nova AI is thinking
          <span className="dot-typing ml-1"></span>
        </div>

        <div
          className={`text-xs flex ml-auto mt-0 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
        </div>
      </div>
    </div>
  </div>
)}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className={`flex items-center rounded-2xl m-3 mt-1 p-2 ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
          }`}
          style={{ boxShadow: '0 8px 10px -6px rgba(0,0,0,0.1)' }}
        >
          <img src={logo} className="h-7 mr-3 opacity-70" alt="Logo" />
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
            placeholder="Ask something..."
            className={`outline-none w-full ${
              darkMode
                ? 'bg-gray-800 text-gray-300 placeholder-gray-500'
                : ''
            }`}
          />
          {attachment && (
            <div className="relative">
              <img src={URL.createObjectURL(attachment)} className="h-8" />
              <button
                onClick={() => setAttachment(null)}
                className="absolute -top-1 -right-1 text-xs rounded-full w-3 h-3 flex items-center justify-center"
              >
                ✖
              </button>
            </div>
          )}
          <input
            type="file"
            id="attachment"
            style={{ display: 'none' }}
            onChange={handleAttachmentChange}
          />
          <Tooltip title="Attach File" placement="top" arrow>
            <IconButton component="label" htmlFor="attachment">
              <AttachFileIcon className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleSend}>
            <SendRoundedIcon className={darkMode ? 'text-green-400' : 'text-green-600'} />
          </IconButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BotChatArea;
