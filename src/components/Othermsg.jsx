"use client";

import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { VscReactions } from "react-icons/vsc";
import { reacttomsg } from "../services/msgAPI";
import { useDispatch } from "react-redux";
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
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isYesterday(date, now)) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
}

const Othermsg = ({ content, time, sender,imageUrl, reactions, id ,parentAddReaction}) => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh)
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#1ABC9C", "#E74C3C", "#2ECC71"];
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  function getColorFromUsername(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  }
  
  const textColor = getColorFromUsername(`${sender}`);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [messageReactions, setMessageReactions] = useState(() => {
    if (!reactions || reactions.length === 0) {
      return {};
    }
  
    return reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});
  });
  const [isReactionPickerOpen, setReactionPickerOpen] = useState(false);

  const emojiOptions = ["😂", "❤️", "🫡","🥹", "👍", "😏","😑"];
  useEffect(() => {
    if (!reactions || reactions.length === 0) {
      setMessageReactions({});
      return;
    }
    const reactionCount = reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});
    setMessageReactions(reactionCount);
  }, [reactions,refresh]);
  const addReaction = async (emoji) => {
    try {
      const response = await dispatch(reacttomsg(emoji, id, token));
      console.log("Full Response:", response); // Debugging: log full response
  
      // Validate response structure
      if (!response || !response.data || !response.data.reactions) {
        throw new Error("Invalid response structure");
      }
  
      // Extract and process the reactions array
      const { reactions } = response.data; // Correct path to reactions
      const updatedReactions = reactions.reduce((acc, reaction) => {
        acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
        return acc;
      }, {});
  
      setMessageReactions(updatedReactions);
      setReactionPickerOpen(false);
      parentAddReaction();
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };
  useEffect(() =>{
        console.log("ye raha",reactions)
      },[refresh,messageReactions])
      
  return (
    <div className="flex flex-col items-start">
      <div className="relative">
        <div
          className={`flex flex-col rounded-3xl max-w-80 mr-auto w-fit m-2 p-2 px-4 gap-0 space-y-0 ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-900"
          }`}
        >
          <div className="mb-0 text-sm font-bold" style={{ color: textColor }}>
            {sender}
          </div>
          {imageUrl && <img src={imageUrl} alt="Attachment" className="rounded-lg max-w-full mb-1" />}
          {
            content && <div className={`text-md mb-0 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{content}</div>
          }
          
          <div className={`text-xs flex ml-auto mt-0 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          
            {formatWhatsAppStyle(time)}
          </div>
        </div>


          {
            reactions.length === 0 ? (
              <div
                            className={`absolute left-0 bottom-0 transform translate-x-2 translate-y-1 flex items-center gap-1 px-1 py-1 rounded-full shadow-md ${
                              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <button onClick={() => setReactionPickerOpen(!isReactionPickerOpen)}>
                              <VscReactions size={16} />
                            </button>
                          </div>
            ) : (
              Object.keys(messageReactions).length > 0 && (
          <div
            className={` cursor-pointer absolute left-0 bottom-0 transform translate-x-2 translate-y-1 flex items-center gap-1 px-2 py-1 rounded-full shadow-md ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
            }`} onClick={() => setReactionPickerOpen(!isReactionPickerOpen)}
            
          >
            {Object.entries(messageReactions).map(([emoji, count]) => (
              <div key={emoji} className="flex items-center" size={16}>
                <span className="text-xs">{emoji}</span>
                {count > 1 && <span className="text-xs ml-1">{count}</span>}
              </div>
            ))}
          </div>
        )
            )
          }
      </div>


      {/* <button
        className={`text-xs flex items-center gap-1 mt-1 ml-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        onClick={() => setReactionPickerOpen(!isReactionPickerOpen)}
      >
        <Smile size={16} />
        {isReactionPickerOpen ? "Cancel" : "React"}
      </button> */}

      {/* Reaction Picker */}
      {isReactionPickerOpen && (
        <div className={`flex gap-2 p-2 rounded-lg shadow-md ml-4 mt-1 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              className="text-lg hover:scale-110 transition-transform"
              onClick={() => addReaction(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Othermsg;



