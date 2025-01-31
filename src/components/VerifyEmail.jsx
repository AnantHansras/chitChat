import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/userAPI";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const signupData = useSelector((state) => state.signupData.signupdata);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    dispatch(signUp(name, email, password, otp, navigate));
  };

  return (
    <div
      className={`min-h-[calc(100vh-3.5rem)] h-full w-full grid place-items-center ${
        isDarkMode ? " text-white" : " text-gray-900 bg-[#f4f5f8]"
      }`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md p-6 lg:p-8 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-semibold text-center text-green-400">Verify Email</h1>
        <p className="text-base my-4">
          A verification code has been sent to your email. Enter the code below
        </p>
        <form onSubmit={handleOnSubmit}>
        <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  renderInput={(props) => (
    <input
      {...props}
      placeholder="-"
      style={{
        boxShadow: isDarkMode
          ? "inset 0px -1px 0px rgba(0, 0, 0, 0.5)"
          : "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className={`w-[48px] lg:w-[60px] border-0 rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 ${
        isDarkMode
          ? "bg-green-100 text-white focus:outline-green-500"
          : "bg-gray-300 text-gray-700 focus:outline-yellow-50"
      }`}
    />
  )}
  containerStyle={{
    justifyContent: "space-between",
    gap: "0 6px",
  }}
/>

        
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md mt-6 font-medium ${
              isDarkMode
                ? "bg-green-500 text-gray-900 hover:bg-green-400"
                : "bg-green-600 text-white hover:bg-green-500"
            } transition-all duration-200`}
          >
            Verify Email
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup" className="flex items-center gap-2 hover:text-green-500">
            <BiArrowBack /> <span>Back To Signup</span>
          </Link>
          <button
            className="flex items-center gap-2 hover:text-green-500"
            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
          >
            <RxCountdownTimer />
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;


// mport React from 'react'
// import { useEffect, useState } from "react";
// import OtpInput from "react-otp-input";
// import { Link } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
// import { RxCountdownTimer } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/userAPI";
// import { useNavigate } from "react-router-dom";
// const VerifyEmail = () => {
//     const [otp, setOtp] = useState("");
//   const  signupData = useSelector((state) => state.signupData.signupdata);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!signupData) {
//       navigate("/signup");
//     }
//   }, []);

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const {
//       name,
//       email,
//       password,
//     } = signupData;

//     dispatch(signUp(name,email,password,otp,navigate));
//   };

//     return (
//         <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
//             <div className="max-w-[500px] p-4 lg:p-8">
//               <h1 className="text-green-300 font-semibold text-[1.875rem] leading-[2.375rem]">
//                 Verify Email
//               </h1>
//               <p className="text-[1.125rem] leading-[1.625rem] my-4 text-green-100">
//                 A verification code has been sent to you. Enter the code below
//               </p>
//               <form onSubmit={handleOnSubmit}>
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   numInputs={6}
//                   renderInput={(props) => (
//                     <input
//                       {...props}
//                       placeholder="-"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                       }}
//                       className="w-[48px] lg:w-[60px] border-0 bg-green-100 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
//                     />
//                   )}
//                   containerStyle={{
//                     justifyContent: "space-between",
//                     gap: "0 6px",
//                   }}
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-green-300 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
//                 >
//                   Verify Email
//                 </button>
//               </form>
//               <div className="mt-6 flex items-center justify-between">
//                 <Link to="/signup">
//                   <p className="text-white flex items-center gap-x-2">
//                     <BiArrowBack /> 
//                     Back To Signup
//                   </p>
//                 </Link>
//                 <button
//                   className="flex items-center text-white gap-x-2"
//                   onClick={() => dispatch(sendOtp(signupData.email,navigate))}
//                 >
//                   <RxCountdownTimer />
//                   Resend it
//                 </button>
//               </div>
//             </div>
//         </div>
//       );
// }

// export default VerifyEmail