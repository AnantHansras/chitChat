import './App.css';
import ChatArea from './components/ChatArea';
import Welcome from './components/Welcome';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import Groups from './components/Groups';
import AllUsers from './components/AllUsers';
import CreateGroup from './components/CreateGroup';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux'; 
import VerifyEmail from './components/VerifyEmail';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import logo from './assets/image.png'
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import { ToastContainer } from 'react-toastify';
import { useEffect,useState } from 'react';
import SideBar from './components/SideBar';
import MobileContainer from './components/MobileContainer';
import { useAuth0 } from '@auth0/auth0-react';
function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

// Auto login when not authenticated
useEffect(() => {
  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
  }
}, [isAuthenticated, isLoading, loginWithRedirect]);
  useEffect(() => {
    const saveUser = async () => {
      if (!user) return;

      try {
        const token = await getAccessTokenSilently({
          audience: "https://myapi.express.com", 
        });

        // ✅ Save token to localStorage
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));

        await fetch("https://chitchat-backend-22lq.onrender.com/api/save-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: user.sub,
            name: user.name,
            email: user.email,
          }),
        });
      } catch (err) {
        console.error("Save-user error:", err);
      }
    };

    if (isAuthenticated && user) {
      saveUser();
    }
  }, [isAuthenticated, user]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); 
  const loading = useSelector((state) => state.loading.loading);
  if (isLoading || !isAuthenticated) {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <CircularProgress />
    </div>
  );
}
  return (
    <div
      className={`h-screen  flex flex-row justify-center items-center ${
        darkMode ? 'bg-gray-900' : 'bg-[#dddedd]'
      }`}
    >


  <Backdrop className='flex flex-col space-y-2'
        open = {loading}
        sx={(theme) => ({ color: '#aea', zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color="inherit" size="3rem" />
      </Backdrop> 
    
      <Routes>
      {/* Common Routes */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password/:id" element={<UpdatePassword />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} /> */}

      {/* Nested Routes for Desktop */}
      {!isMobile && (
        <Route path="/" element={<MainContainer />}>
          <Route path="" element={<Welcome />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="groups" element={<Groups />} />
          <Route path="chat/:params" element={<ChatArea />} />
          <Route path="creategroup" element={<CreateGroup />} />
        </Route>
      )}
      {isMobile && (
        <Route path="/" element={<MobileContainer />}>
          <Route path="" element={<SideBar />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="groups" element={<Groups />} />
          <Route path="chat/:params" element={<ChatArea />} />
          <Route path="creategroup" element={<CreateGroup />} />
        </Route>
      )}
    </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

