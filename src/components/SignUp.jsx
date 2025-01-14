import logo from '../assets/image.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSignupdata } from '../slices/SignupDataSlice';
import { sendOtp } from '../services/userAPI';
export default () => {
    const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode state from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({name:"",email:"",password:""});
    const {name,email,password} = formData;
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
    }
    const handleOnSubmit = (e) => {
    
        e.preventDefault()
        const signupData = {
          ...formData
        }
    
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupdata(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))
        // Reset
        setFormData({
          name:"",
          email: "",
          password: "",
        })
      }
    
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
                            } text-2xl font-bold flex items-center justify-center sm:text-3xl`}
                        >
                            Create an account
                            <img src={logo} className="h-8 mt-1 opacity-70 ml-3" />
                        </h3>
                        <p>
                            Already have an account?{' '}
                            <a
                                href="javascript:void(0)"
                                className={`font-medium ${
                                    darkMode
                                        ? 'text-green-400 hover:text-green-300'
                                        : 'text-green-600 hover:text-green-500'
                                }`}
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                Log in
                            </a>
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
                            <label className="font-medium">Name</label>
                            <input
                                name="name"
                                value={name}
                                onChange={handleOnChange}
                                type="text"
                                required
                                placeholder='Enter your name'
                                className={`w-full mt-2 px-3 py-2 ${
                                    darkMode ? 'text-gray-300 bg-gray-900 border-gray-700' : 'text-gray-500 bg-transparent'
                                } outline-none border focus:border-green-600 shadow-sm rounded-lg`}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                type="email"
                                required
                                placeholder='Enter your email'
                                className={`w-full mt-2 px-3 py-2 ${
                                    darkMode ? 'text-gray-300 bg-gray-900 border-gray-700' : 'text-gray-500 bg-transparent'
                                } outline-none border focus:border-green-600 shadow-sm rounded-lg`}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                type="password"
                                required
                                placeholder='Create a strong password'
                                className={`w-full mt-2 px-3 py-2 ${
                                    darkMode ? 'text-gray-300 bg-gray-900 border-gray-700' : 'text-gray-500 bg-transparent'
                                } outline-none border focus:border-green-600 shadow-sm rounded-lg`}
                            />
                        </div>
                        <button
                            className={`w-full px-4 py-2 text-white font-medium ${
                                darkMode ? 'bg-green-500 hover:bg-green-400 active:bg-green-500' : 'bg-green-600 hover:bg-green-500 active:bg-green-600'
                            } rounded-lg duration-150`}
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};
