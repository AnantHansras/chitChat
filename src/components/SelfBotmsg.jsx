import React from "react";
import { useSelector } from "react-redux";

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

const SelfBotmsg = ({ content, time, imageUrl }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex flex-col items-end ">
      <div className="relative group">
        <div
          className={`flex flex-col rounded-3xl max-w-80 ml-auto w-fit m-2 p-2 px-4 gap-0 space-y-0 relative ${
            darkMode ? "bg-[#3e8b6f]" : "bg-[#C8F0A0]"
          }`}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Attachment"
              className="rounded-lg max-w-full mb-1"
            />
          )}

          <div
            className={`mb-0 text-md flex justify-between items-end ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {content}
          </div>
          <div
            className={`text-xs ml-auto mt-0 flex items-center gap-1 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {formatWhatsAppStyle(time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfBotmsg;
