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

const OtherBotmsg = ({ content, time, sender, imageUrl }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F",
    "#8E44AD", "#1ABC9C", "#E74C3C", "#2ECC71"
  ];

  function getColorFromUsername(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  }

  const textColor = getColorFromUsername(`${sender}`);

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
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Attachment"
              className="rounded-lg max-w-full mb-1"
            />
          )}
          {content && (
            <div
              className={`text-md mb-0 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {content}
            </div>
          )}

          <div
            className={`text-xs flex ml-auto mt-0 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {formatWhatsAppStyle(time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBotmsg;
