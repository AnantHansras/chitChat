import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { createGroup } from "../services/chatAPI";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { Loader2 } from "lucide-react";
import { IconButton } from '@mui/material';
const CreateGroup = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const [groupName, setGroupName] = useState("");
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = async () => {
    if (groupName) {
      setLoading(true);
      await dispatch(createGroup(groupName, token));
      setGroupName("");
      setLoading(false);
    } else {
      alert("Please enter a group name.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 md:flex-[0.7] flex justify-center items-center px-4 md:px-0"
      >
        <div
          className={`flex flex-col p-6 rounded-2xl w-full max-w-md ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
          } shadow-lg`}
        >
        <div className="flex items-center md:mb-4 mb-2">
        <IconButton onClick={() => {isMobile ? navigate('/') : navigate('/')}} color="inherit" className='opacity-100'>
        <Tooltip title="Home" placement="top" className=" font-bold" arrow><ArrowBackIcon /></Tooltip>
        </IconButton>
      <h3 className="text-xl font-semibold text-center md:ml-2 md:mb-1">
            Create a Group
          </h3>
        </div>
          
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            placeholder="Enter group name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateGroup();
              }
            }}
            className={`p-1 md:p-3 border rounded-lg text-lg w-full focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-500 text-gray-300 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-green-500"
            }`}
          />
          <button
            onClick={handleCreateGroup}
            disabled={loading}
            className={`mt-4 bg-green-500 text-white p-2 md:p-3 rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none w-full ${
              darkMode ? "hover:bg-green-400" : "hover:bg-green-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateGroup;


