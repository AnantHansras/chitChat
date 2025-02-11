import logo from '../assets/image.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../services/userAPI';

export default () => {
    const darkMode = useSelector((state) => state.darkMode.isDarkMode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    };


const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if(!isMobile){
                navigate('/main/welcome');
            }
            else{
                navigate('/main/');
            }
        }
    }, [navigate]);

    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center  ${darkMode ? 'bg-gray-900' : 'bg-[#f4f5f8]'}`}>
            <div className={`w-full  max-w-xs md:max-w-sm  space-y-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className={`text-2xl flex justify-center items-center font-bold sm:text-3xl ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            Log in to your Account
                            <img src={logo} className="h-8 mt-1 opacity-70 ml-3" alt="logo" />
                        </h3>
                        <p>
                            Don't have an account?{' '}
                            <button className={`font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`} onClick={() => navigate('/signup')}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
                <div className={`p-4 py-6 sm:p-6 rounded-xl border-2 shadow-lg ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <form onSubmit={handleOnSubmit} className="space-y-5">
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder='Enter your email'
                                type="text"
                                required
                                className={`w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-lg focus:border-green-600 ${darkMode ? 'text-gray-300 bg-gray-900 border-gray-700' : 'text-gray-500 bg-transparent'}`}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter Password'
                                type="password"
                                required
                                className={`w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-lg focus:border-green-600 ${darkMode ? 'text-gray-300 bg-gray-900 border-gray-700' : 'text-gray-500 bg-transparent'}`}
                            />
                        </div>
                        <button className={`w-full px-4 py-2 text-white font-medium rounded-lg duration-150 ${darkMode ? 'bg-green-500 hover:bg-green-400 active:bg-green-500' : 'bg-green-600 hover:bg-green-500 active:bg-green-600'}`}>
                            Sign In
                        </button>
                        <div onClick={() => navigate('/forgot-password')} className={`cursor-pointer text-center ${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>
                            Forgot password?
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};