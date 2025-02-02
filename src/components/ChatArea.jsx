import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
import Tooltip from '@mui/material/Tooltip';
import { io } from "socket.io-client";
import { refreshWeb } from '../slices/RefreshSlice';
import ChatBanner from './ChatBanner';
const ENDPOINT = process.env.REACT_APP_BASE_URL; // Backend server URL
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
  const [attachment, setAttachment] = useState(null);
  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) {
      
      setAttachment(e.target.files[0]);
      console.log(attachment)
    }
  };
  const handleSeen = (msg) => {
    if (!msg.seenBy || !msg.chat || !msg.chat.users) {
      // If no seenBy array, no chat data, or users data is missing, assume not seen.
      return false;
    }

    const allGroupMembers = msg.chat.users;
    const seenByUserIds = msg.seenBy.map((user) => user._id);
    if (isGroupChat == 'false') {
      // For individual chats: Check if the receiver has seen the message.
      const otherUserId = allGroupMembers.find((memberId) => memberId !== user._id);
      
      return seenByUserIds.includes(otherUserId);
    } else {
      // For group chats: Check if all members (excluding the sender) have seen the message.
      const usersWhoNeedToSee = allGroupMembers.filter((id) => id !== msg.sender._id);
      if (usersWhoNeedToSee.length === 0) {
        return false;
      }
  
      return usersWhoNeedToSee.every((userId) => seenByUserIds.includes(userId));
    }
  };

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
  const [refresh2,setRefresh2] = useState(false);
  useEffect(() => {
    const handleRefresh = () => {
      dispatch(refreshWeb());
    };
    const handleRefresh2 = () => {
      setRefresh2((prev) => !prev);
    };
  
    if (socketRef.current) {
      // Add the listener
      socketRef.current.on("refresh", handleRefresh);
      socketRef.current.on("refresh2", handleRefresh2);
      console.log("Refresh listener added");
    }
  
    return () => {
      if (socketRef.current) {
        // Clean up the listener to avoid duplicates
        socketRef.current.off("refresh", handleRefresh);
        socketRef.current.off("refresh2", handleRefresh2);
        // console.log("Refresh listener removed");
      }
    };
  }, [dispatch]);
  const parentAddReaction = async () =>{
    socketRef.current.emit("newMessage", chatId);
    console.log("aya kya??")
  }
  // Fetch messages for the current chat and join the room
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await dispatch(allmsgs(chatId, token));
        setAllMsg(messages.data);

        // Emit chat access event
        socketRef.current.emit("chat access", chatId);
        //socketRef.current.emit("newMessage", chatId);
        // console.log("Chat access sent for room:", chatId);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId, dispatch, refresh, token]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await dispatch(allmsgs(chatId, token));
        setAllMsg(messages.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId, dispatch, refresh2, token]);
  // Handle message sending
  const handleOnSend = async (e) => {
    e.preventDefault();

    if (!msg.trim() && !attachment) return; // Prevent sending empty messages

    try {
      await dispatch(sendmsg(msg,attachment, chatId, token));

      // Emit new message event to notify others
      socketRef.current.emit("newMessage", chatId);
      // console.log("New message sent to room:", chatId);

      setMsg(""); // Clear input field
      setAttachment(null);
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
            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-[#d9d9d9] text-white'
          }`}
        >
          {chatName[0]}
        </div>
        <div className="ml-4 mb-1 text-xl font-bold">{chatName}</div>
        <div className="ml-auto mr-4">
    <IconButton 
        color="inherit" 
        className="ml-auto opacity-60" 
        onClick={isGroupChat === 'false' ? () => navigate('/main/welcome') : handleDelete}
    >
        <Tooltip title={isGroupChat === 'false' ? "Home" : "Leave Group"} placement="top" arrow>
            {isGroupChat === 'false' ? <HomeIcon /> : <DeleteIcon />}
        </Tooltip>
    </IconButton>
</div>
        
        
      </div>
      
      <div
          className={`rounded-2xl m-3 my-1 p-2 flex-1 overflow-y-auto relative flex flex-col ${
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
        
    
  
        <ChatBanner />
 
          {allMsg.map((msg, index) => {
            return user._id == msg.sender._id ? (
              <Selfmsg parentAddReaction={parentAddReaction} key={index} content={msg.content} time={msg.createdAt} seen={handleSeen(msg)} imageUrl={msg.imageUrl}  id={msg._id} reactions={msg.reactions}/>
            ) : (
              <Othermsg parentAddReaction={parentAddReaction} key={index} sender={msg.sender.name} content={msg.content} id={msg._id} time={msg.createdAt} imageUrl={msg.imageUrl} reactions={msg.reactions}/>
            );
          })}
          
          <div ref={messagesEndRef} />

          
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
          onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleOnSend(e); 
    }
  }}
          placeholder="Type a message"
          className={`outline-none mr-auto mb-1 border-none w-full ${
            darkMode ? 'bg-gray-800 text-gray-300 placeholder-gray-500' : ''
          }`}
        />
        {
          attachment &&<div className='relative'>
          <img src={URL.createObjectURL(attachment)} className='h-8 rounded-sm'/>
          <button
        onClick={() => setAttachment(null)} // Add logic to remove attachment
        className="absolute -top-1 -right-1 text-xs rounded-full w-2 h-3 flex items-center justify-center"
      >
        ✖
      </button>
          </div> 
        }
        <input
            type="file"
            id="attachment"
            style={{ display: 'none' }}
            onChange={handleAttachmentChange}
          />
        <Tooltip title="Attach File" placement="top" arrow>
            <IconButton component="label" htmlFor="attachment">
              <AttachFileIcon className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </IconButton>
          </Tooltip>
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
