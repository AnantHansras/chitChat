import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Selfmsg from './Selfmsg';
import Othermsg from './Othermsg';
import logo from '../assets/image.png';
import { useDispatch, useSelector } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion'
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate,useParams} from 'react-router-dom'
import { exitGroup } from '../services/chatAPI';
import { allmsgs, sendmsg } from '../services/msgAPI';
import { useRef } from 'react';

import { io } from "socket.io-client";
import { refreshWeb } from '../slices/RefreshSlice';

const ENDPOINT = "http://localhost:5000"; // Backend server URL
const ChatArea = () => {
  const refresh = useSelector((state) => state.refresh.refresh)
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { params } = useParams(); 
  const [chatId, chatName,isGroupChat] = params.split('&'); 
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const [msg,setMsg] = useState('');
  const [allMsg,setAllMsg] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [allMsg]);
  const handleDelete = async()=>{
    navigate('/main/welcome');
    const groupId = chatId
    dispatch(exitGroup(groupId,token));
  }

  const socketRef = useRef();
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
      console.log("Refresh event received");
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
        // console.log("Refresh listener removed");
      }
    };
  }, [dispatch]);

  // Fetch messages for the current chat and join the room
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await dispatch(allmsgs(chatId, token));
        setAllMsg(messages.data);

        // Emit chat access event
        socketRef.current.emit("chat access", chatId);
        // console.log("Chat access sent for room:", chatId);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId, dispatch, refresh, token]);

  // Handle message sending
  const handleOnSend = async (e) => {
    e.preventDefault();

    if (!msg.trim()) return; // Prevent sending empty messages

    try {
      await dispatch(sendmsg(msg, chatId, token));

      // Emit new message event to notify others
      socketRef.current.emit("newMessage", chatId);
      // console.log("New message sent to room:", chatId);

      setMsg(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <AnimatePresence>
        <motion.div
        initial={ {opacity:0,scale:0} }
          animate={ {opacity:1,scale:1} }
          exit={ {opacity:0,scale:0} }
          transition={{duration:'0.5'}}
      className={`flex flex-col h-100 flex-[0.7] ${
        darkMode ? ' text-gray-300' : ''
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-row justify-start m-3 mb-1 p-1 items-center rounded-2xl ${
          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
        }`}
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
        <div
          className={`h-10 w-10 p-1 flex justify-center ml-2 rounded-full items-center text-xl font-bold ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-[#d9d9d9] text-white'
          }`}
        >
          {chatName[0]}
        </div>
        <div className="ml-4 mb-1 text-xl font-bold">{chatName}</div>
        <div className='ml-auto mr-4'>
        {
          isGroupChat === 'false' ? (<IconButton  color="inherit" className='ml-auto opacity-60' onClick={() => navigate('/main/welcome')}><HomeIcon/></IconButton>):
          (<IconButton onClick={handleDelete} color="inherit" className='ml-auto opacity-60' ><DeleteIcon/></IconButton>)
        }
        </div>
        
        
      </div>

      <div
          className={`rounded-2xl m-3 my-1 p-2 flex-1 overflow-y-auto flex flex-col-reverse ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          style={{
            scrollbarWidth: 'none', // For Firefox
      msOverflowStyle: 'none', // For IE and Edge
      WebkitOverflowScrolling: 'touch', // For smoother scrolling on mobile
            boxShadow:
              '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          }}
        >
          <div ref={messagesEndRef} />
          {allMsg.map((msg, index) => {
            return user._id == msg.sender._id ? (
              <Selfmsg key={index} content={msg.content} time={msg.createdAt} />
            ) : (
              <Othermsg key={index} sender={msg.sender.name} content={msg.content} time={msg.createdAt}/>
            );
          })}
          
        </div>
      {/* Input Section */}
      <div
        className={`flex flex-row rounded-2xl m-3 mt-1 p-2 items-center ${
          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
        }`}
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
        <img src={logo} className="h-7 mr-3 opacity-70" alt="Logo" />
        <input
          name='msg'
          value={msg}
          onChange={(e) =>{e.preventDefault();setMsg(e.target.value)}}
          type="text"
          placeholder="Type a message"
          className={`outline-none mr-auto mb-1 border-none ${
            darkMode ? 'bg-gray-800 text-gray-300 placeholder-gray-500' : ''
          }`}
        />
        <IconButton onClick={handleOnSend}>
          <SendRoundedIcon 
            className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}
          />
        </IconButton>
      </div>
        </motion.div>
    </AnimatePresence>
    
  );
};

export default ChatArea;
