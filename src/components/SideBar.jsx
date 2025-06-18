import React from 'react';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton } from '@mui/material';
import FriendContainer from './FriendContainer';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/ThemeSlice';
import LightModeIcon from '@mui/icons-material/LightMode';
import { logout } from '../services/userAPI';
import { useEffect,useState } from 'react';
import { fetchChats } from '../services/chatAPI';
import Tooltip from '@mui/material/Tooltip';
import { useAuth0 } from '@auth0/auth0-react';
const SideBar = () => {
  const { logout } = useAuth0();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search,setSearch] = useState("");
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const userString = localStorage.getItem("user");
const userData = userString ? JSON.parse(userString) : null;
  const [chats, setChats] = useState([]);
  const toggleModeHandler = () => {
    dispatch(toggleTheme());
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const refresh = useSelector((state) => state.refresh.refresh)
  const handleOnClick = (e) =>{
    e.preventDefault();
    logout({ returnTo: window.location.origin });
    // dispatch(logout(navigate));
  }
  const handleSearch = async (e) =>{
        e.preventDefault();
        const fetchedChats = await dispatch(fetchChats(token,search));
        setChats(fetchedChats.data);
    }
    useEffect(()=>{
    const fetch = async()=>{
      setLoading(true);
      const fetchedChats = await dispatch(fetchChats(token,search));
      setChats(fetchedChats.data);
      setLoading(false);
    }
      fetch();
  },[])
  useEffect(()=>{
    const fetch = async()=>{
      const fetchedChats = await dispatch(fetchChats(token,search));
      setChats(fetchedChats.data);
    }
      fetch();
  },[search,refresh])

  return (
    <div
      className={`flex-1 md:flex-[0.3] flex flex-col ${
        darkMode ? ' text-white' : ''
      }`}
    >
      {/* icons */}
      <div
        className={`flex flex-row justify-evenly rounded-2xl mb-1 py-1 m-3 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
      {
        !isMobile && <IconButton onClick={() => {isMobile ? navigate('/') : navigate('/')}} color="inherit" className='opacity-60'>
        <Tooltip title="Home" placement="top" arrow><HomeIcon /></Tooltip>
        </IconButton>
      }
        
        <IconButton onClick={() => navigate('allusers')} color="inherit" className='opacity-60'>
        <Tooltip title="All Users" placement="top" arrow><MapsUgcIcon /></Tooltip>
        </IconButton>
        <IconButton onClick={() => navigate('groups')} color="inherit" className='opacity-60'>
        <Tooltip title="All Groups" placement="top" arrow><GroupsIcon /></Tooltip>
        </IconButton>
        <IconButton onClick={() => navigate('creategroup')} color="inherit" className='opacity-60'>
        <Tooltip title="Create Group" placement="top" arrow><GroupAddIcon /></Tooltip>
        </IconButton>
        <IconButton onClick={toggleModeHandler} color="inherit" className='opacity-60'>
        {
          darkMode ? <Tooltip title="Light Mode" placement="top" arrow><LightModeIcon/></Tooltip> : <Tooltip title="Dark Mode" placement="top" arrow><NightsStayIcon /></Tooltip>
        }
        </IconButton>
        <IconButton color="inherit" className='opacity-60' onClick={handleOnClick}>
        <Tooltip title="Logout" placement="top" arrow><LogoutIcon /></Tooltip>
        </IconButton>
      </div>
      {/* search bar */}
      <div
        className={`flex flex-row items-center rounded-2xl m-3 my-1 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white'
        }`}
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
        <IconButton color="inherit" className='opacity-60' onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <input
        value = {search}
        name="search"
        onChange={(e) => {e.preventDefault(); setSearch(e.target.value)}}
          type="text"
          placeholder="Search"
          className={`ml-2 mb-1 w-[70%] text-lg border-none outline-none ${
            darkMode ? 'bg-gray-800 text-white' : ''
          }`}
        />
      </div>
      {/* friends */}
      <div
        className={`rounded-2xl flex-1 m-3 mt-1 overflow-y-scroll ${
          darkMode ? 'bg-gray-800 text-white' : ' bg-white'
        }`}
        style={{
          scrollbarWidth: 'none', // For Firefox
      msOverflowStyle: 'none', // For IE and Edge
      WebkitOverflowScrolling: 'touch', // For smoother scrolling on mobile
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        }}
      >
      {/* yaha */}
      {
        loading ? (
  // Skeleton loading placeholders
  [...Array(5)].map((_, idx) => (
     <div
  key={idx}
  className={`animate-pulse flex items-center space-x-4 p-3 ${
    darkMode ? 'bg-gray-800' : 'bg-white'
  }`}
>
  <div
    className={`rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} h-10 w-10`}
  ></div>
  <div className="flex-1 space-y-1 py-1">
    <div
      className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded w-3/4`}
    ></div>
    <div
      className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded w-1/2`}
    ></div>
  </div>
</div>


  ))
) :(chats.map((user, index) => {
          let chatName = "";
          if(user.isGroupChat){
            chatName = user.chatName
          }
          else{
            user.users.map((u) =>{
              if(u.auth0Id != userData.sub){
                chatName = u.name;
              }
            })
          }
          return (
            <FriendContainer key={index} friend={user} chatName={chatName}>
            </FriendContainer>
          )
        }
          

          
        ))
      }
        

      </div>
    </div>
  );
};

export default SideBar;

