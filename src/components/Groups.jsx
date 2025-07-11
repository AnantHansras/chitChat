import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import logo from '../assets/image.png';
import { useSelector,useDispatch } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion'
import { useState,useEffect } from 'react';
import { fetchGroups } from '../services/chatAPI';
import GroupComponent from './GroupComponent';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
const Groups = () => {
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
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const [search,setSearch] = useState("");
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  const [groups, setGroups] = useState([]);
  

  // const handleOnClick = async (e) =>{
  //     e.preventDefault();
  //     const fetchedGroups = await dispatch(fetchGroups(token, search));
  //     setGroups(fetchedGroups.data);
  // }
  // useEffect(() => {

  //     const fetchData = async () => {
  //       const fetchedGroups = await dispatch(fetchGroups(token, search));
  //       setGroups(fetchedGroups.data);
  //     };
  
  //     fetchData(); 
  //   }, [search]);
   const fetchData = async () => {
    setLoading(true); // 👈 Start loading
    try {
      const fetchedGroups = await dispatch(fetchGroups(token, search));
      setGroups(fetchedGroups.data);
    } catch (err) {
      console.error("Failed to fetch groups", err);
    }
    setLoading(false); // 👈 End loading
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData(); // initial + whenever `search` changes
  }, [search]);
  return (
    <AnimatePresence>
        <motion.div
          initial={ {opacity:0,scale:0} }
          animate={ {opacity:1,scale:1} }
          exit={ {opacity:0,scale:0} }
          transition={{duration:'0.5'}}
          className={`flex-1 md:flex-[0.7] flex flex-col  ${
            darkMode ? ' text-gray-300' : 'text-[#0000008F]'
          }`}
        >
          {/* Icons */}
          <div
            className={`flex flex-row justify-start md:space-x-7 space-x-1 items-center rounded-2xl mb-1 p-2 m-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            {
        isMobile ? (<IconButton onClick={() => {isMobile ? navigate('/') : navigate('/')}} color="inherit" className='opacity-60 h-8'>
        <Tooltip title="Home" placement="top" arrow><HomeIcon /></Tooltip>
        </IconButton>) : (<img src={logo} className="opacity-70 h-8" />)
      }
            <div className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-[#0000008A]'}`}>
              All Available Groups
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={` flex flex-row items-center rounded-2xl m-3 my-1 ${
              darkMode ? ' bg-gray-800' : ' bg-white'
            }`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            <IconButton color="inherit" className='opacity-60' onClick={handleOnClick}>
              <SearchIcon  />
            </IconButton>
            <input
            name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for Groups"
              className={`ml-2 mb-1 w-[70%] text-lg border-none outline-none ${
                darkMode ? 'bg-gray-800 text-gray-300' : ''
              }`}
            />
          </div>

          {/* Friends */}
          <div className="rounded-2xl flex-1 m-3 my-1 overflow-y-auto mb-4" 
          style={{
          scrollbarWidth: 'none', // For Firefox
      msOverflowStyle: 'none', // For IE and Edge
      WebkitOverflowScrolling: 'touch', // For smoother scrolling on mobile
        }}>
                    {loading ? (
            <>
              {[...Array(4)].map((_, idx) => (
                <GroupSkeleton key={idx} darkMode={darkMode} />
              ))}
            </>
          ) : groups.length > 0 ? (
            groups.map((group, index) =>
              group.chatName ? <GroupComponent key={index} friend={group} /> : null
            )
          ) : (
            <div className="text-center mt-5 text-2xl text-gray-500">No group found</div>
          )}
          </div>
        </motion.div>
    </AnimatePresence>
    
  );
};
const GroupSkeleton = ({ darkMode }) => (
  <div
    className={`animate-pulse flex items-center space-x-4 rounded-xl p-4 mb-2 ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <div className={`rounded-full h-10 w-10 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
    <div className="flex-1 space-y-2 py-1">
      <div className={`h-4 rounded w-3/4 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>
      <div className={`h-4 rounded w-1/2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
    </div>
  </div>
);
export default Groups;

