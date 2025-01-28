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
function App() {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); 
  const loading = useSelector((state) => state.loading.loading);
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
        <img src={logo} className='h-20 opacity-70'/>
        <CircularProgress color="inherit" size="3rem" />
      </Backdrop> 
    
      

      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/main" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="groups" element={<Groups />} />
          <Route path="chat/:params" element={<ChatArea />} />
          <Route path="creategroup" element={<CreateGroup />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

