
import logo from '../assets/image.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../services/userAPI';
export default () => {
    const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({email:"",password:""});
    const {email,password} = formData;
    const handleOnChange = (e)=>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }
    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
          // Navigate to the "About" page
          navigate('/main/welcome');
        }
      }, [navigate]);
    return (
        <main
            className={`w-full h-screen flex flex-col items-center justify-center ${
                darkMode ? 'bg-gray-900' : 'bg-[#f4f5f8]'
            } sm:px-4`}
        >
            <div className={`w-full space-y-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:max-w-md`}>
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3
                            className={`${
                                darkMode ? 'text-gray-100' : 'text-gray-800'
                            } text-2xl flex justify-center items-center font-bold sm:text-3xl`}
                        >
                            Log in to your Account
                            <img src={logo} className="h-8 mt-1 opacity-70 ml-3" />
                        </h3>
                        <p>
                            Don't have an account?{' '}
                            <button
                                className={`font-medium ${
                                    darkMode
                                        ? 'text-green-400 hover:text-green-300'
                                        : 'text-green-600 hover:text-green-500'
                                }`}
                                onClick={() => {
                                    navigate('/signup');
                                }}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
                <div
                    className={`${
                        darkMode ? 'bg-gray-800 shadow-lg border-gray-600' : 'bg-white border-gray-300'
                    } p-4 py-6 sm:p-6 sm:rounded-lg border-2 `}
                    style={{
        boxShadow:
          '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      }}
                >
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
                                className={`w-full mt-2 px-3 py-2 ${
                                    darkMode
                                        ? 'text-gray-300 bg-gray-900 border-gray-700'
                                        : 'text-gray-500 bg-transparent'
                                } outline-none border focus:border-green-600 shadow-sm rounded-lg`}
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
                                className={`w-full mt-2 px-3 py-2 ${
                                    darkMode
                                        ? 'text-gray-300 bg-gray-900 border-gray-700'
                                        : 'text-gray-500 bg-transparent'
                                } outline-none border focus:border-green-600 shadow-sm rounded-lg`}
                            />
                        </div>
                        <button
                            className={`w-full px-4 py-2 text-white font-medium ${
                                darkMode
                                    ? 'bg-green-500 hover:bg-green-400 active:bg-green-500'
                                    : 'bg-green-600 hover:bg-green-500 active:bg-green-600'
                            } rounded-lg duration-150`}
                        >
                            Sign In
                        </button>
                        <div
  onClick={() => {
    navigate('/forgot-password');
  }}
  className={`cursor-pointer text-center ${
    darkMode
      ? 'text-gray-300 hover:text-green-400'
      : 'text-gray-800 hover:text-green-600'
  }`}
>
  Forgot password?
</div>

                    </form>
                </div>
            </div>
        </main>
    );
}; 