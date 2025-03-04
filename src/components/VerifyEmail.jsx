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
      className={` w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? " text-gray-300 bg-gray-900" : "bg-[#f4f5f8] text-gray-600"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-lg transition-all ${
          isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-green-400">
          Verify Email
        </h1>
        <p className="text-base text-center mt-2">
          A verification code has been sent to your email. Enter the code below.
        </p>

        <form onSubmit={handleOnSubmit} className="mt-6 space-y-4">
          {/* OTP Input Field */}
          <div className="flex justify-center">
          <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  renderInput={(props) => (
    <input
      {...props}
      placeholder="-"
      className={`w-14 h-14 px-2 md:px-4 sm:w-14 sm:h-14 border-2 rounded-lg text-center mr-2 text-xl font-semibold transition-all duration-200 focus:outline-none
        ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-white focus:ring-2 focus:ring-green-400"
            : "bg-gray-200 border-gray-300 text-black placeholder-black focus:ring-2 focus:ring-green-500"
        }`}
      style={{
        color: isDarkMode ? "white" : "black",
        placeholderColor: isDarkMode ? "white" : "black",
      }}
    />
  )}
  containerStyle={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  }}
/>

          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode
                ? "bg-green-500 text-gray-900 hover:bg-green-400"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            Verify Email
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/signup"
            className="flex items-center gap-2 text-lg transition-all hover:text-green-500"
          >
            <BiArrowBack /> <span>Back to Signup</span>
          </Link>

          <button
            className="flex items-center gap-2 text-lg transition-all hover:text-green-500"
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



