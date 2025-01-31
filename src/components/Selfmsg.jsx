import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaTrashAlt } from "react-icons/fa";
import { VscReactions } from "react-icons/vsc";
import { reacttomsg } from "../services/msgAPI";

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

const Selfmsg = ({ content, time, seen, id, imageUrl, reactions, parentAddReaction }) => {
  const refresh = useSelector((state) => state.refresh.refresh);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   await dispatch(deletemsg(id, token));
  // };
  const [messageReactions, setMessageReactions] = useState(() => {
    if (!reactions || reactions.length === 0) return {};
    return reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});
  });

  const [isReactionPickerOpen, setReactionPickerOpen] = useState(false);
  const reactionPickerRef = useRef(null);
  const emojiOptions = ["😂", "❤️", "🫡", "🥹", "👍", "😏", "😑"];

  const addReaction = async (emoji) => {
    try {
      const response = await dispatch(reacttomsg(emoji, id, token));
      if (!response || !response.data || !response.data.reactions) {
        throw new Error("Invalid response structure");
      }
      const { reactions } = response.data;
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
  }, [reactions, refresh]);

  useEffect(() => {
    if (isReactionPickerOpen && reactionPickerRef.current) {
      reactionPickerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isReactionPickerOpen]);

  return (
    <div className="flex flex-col items-end">
      <div className="relative group">
        <div className={`  flex flex-col rounded-3xl max-w-80 ml-auto w-fit m-2 p-2 px-4 gap-0 space-y-0 relative ${
              darkMode ? "bg-[#3e8b6f]" : "bg-[#C8F0A0]"
            }`} >
          {imageUrl && <img src={imageUrl} alt="Attachment" className="rounded-lg max-w-full mb-1" />}
          
          <div  className={` mb-0 text-md flex justify-between items-end ${
              darkMode ? "text-white" : "text-gray-800"
            }`} >
            {content}
          </div>
          <div className={`text-xs ml-auto mt-0 flex items-center gap-1 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`} >
            {formatWhatsAppStyle(time)}
            {seen ? (
              <div className="text-xs"><span className={` -mr-1 ${
              darkMode ? "text-[#4FB6EC]" : "text-[#4FB6EC]"
            }`} >✓</span><span className={` ${
              darkMode ? "text-[#4FB6EC]" : "text-[#4FB6EC]"
            }`}>✓</span></div>
            ) : (
              <div className="text-xs"><span className={`-mr-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>✓</span><span className={` ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>✓</span></div>
            )}
          </div>
        </div>

        {reactions.length === 0 ? (
          <div
            className={`absolute left-0 bottom-0 transform translate-x-2 translate-y-1 flex items-center gap-1 px-1 py-1 rounded-full shadow-md ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
            }`}
          >
            <button onClick={() => setReactionPickerOpen(!isReactionPickerOpen)}>
              <VscReactions size={16} />
            </button>
          </div>
        ) : (
          Object.keys(messageReactions).length > 0 && (
            <div
              className={`cursor-pointer absolute left-0 bottom-0 transform translate-x-2 translate-y-1 flex items-center gap-1 px-1 py-1 rounded-full shadow-md ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
              }`}
              onClick={() => setReactionPickerOpen(!isReactionPickerOpen)}
            >
              {Object.entries(messageReactions).map(([emoji, count]) => (
                <div onClick={() => setReactionPickerOpen(!isReactionPickerOpen)} key={emoji} className="cursor-pointer flex items-center">
                  <span className="text-xs">{emoji}</span>
                  {count > 1 && <span className="text-xs ml-1">{count}</span>}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {isReactionPickerOpen && (
        <div
          ref={reactionPickerRef}
          className={`flex gap-2 p-2 rounded-lg shadow-md ml-4 mt-1 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {emojiOptions.map((emoji) => (
            <button key={emoji} className="text-lg hover:scale-110 transition-transform" onClick={() => addReaction(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selfmsg;


