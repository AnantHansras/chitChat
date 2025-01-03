import './App.css';
import ChatArea from './components/ChatArea';
import Welcome from './components/Welcome';
import Login from './Login';
import MainContainer from './MainContainer';
import Groups from './components/Groups';
import AllUsers from './components/AllUsers';
import CreateGroup from './components/CreateGroup';
import { Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import { useSelector } from 'react-redux'; // Access darkMode from Redux

function App() {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state

  return (
    <div
      className={`h-screen  flex flex-row justify-center items-center ${
        darkMode ? 'bg-gray-900' : 'bg-[#dddedd]'
      }`}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="groups" element={<Groups />} />
          <Route path="chat" element={<ChatArea />} />
          <Route path="creategroup" element={<CreateGroup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

