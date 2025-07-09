import React from "react";
import { useNavigate } from "react-router-dom";
import { accessChats } from "../services/chatAPI";
import { useSelector, useDispatch } from "react-redux";

const UserComponent = ({ friend }) => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const isGrp = false;

  const handleOnClick = async () => {
    const tempChat = await dispatch(accessChats(friend._id, friend.name, token));
    const chat = tempChat.data;
    navigate(`/chat/${chat._id}&${friend.name}&${isGrp}`);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl my-2 p-4 w-full ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
      } shadow-md`}
    >
      {/* Avatar */}
      <p
        className={`h-12 w-12 flex justify-center items-center rounded-full text-white text-lg font-bold shrink-0 ${
          darkMode ? "bg-gray-600" : "bg-gray-300"
        }`}
      >
        {friend.name[0]}
      </p>

      {/* Friend Name */}
      {
        isMobile && (
        <p className="text-lg font-semibold truncate flex-1">
            {friend.chatName.length > 20
              ? `${friend.chatName.slice(0, 20)}...`
              : friend.chatName}
        </p>
            )
      }
      {
        !isMobile && (
          <p className="text-base font-semibold truncate flex-1">
            {friend.chatName.length > 40
              ? `${friend.chatName.slice(0, 40)}...`
              : friend.chatName}
            </p>
        )
        }

      {/* Message Button */}
      <button
        className={`text-white text-sm px-4 py-1 min-w-[80px] md:w-40 rounded-lg ${
          darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-700"
        } transition`}
        onClick={handleOnClick}
      >
        Open
      </button>
    </div>
  );
};

export default UserComponent;



