import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tokenPassword } from "../services/password";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Assuming Redux is used for theme

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tokenPassword(email, setEmailSent));
  };

  return (
    <div
      className={`grid min-h-[calc(100vh-3.5rem)] place-items-center ${
        isDarkMode ? " text-white" : " text-gray-900"
      }`}
    >
      <div
        className={`max-w-[500px] p-6 lg:p-8 shadow-md rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-semibold leading-[2.375rem] ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {!emailSent ? "Reset Your Password" : "Check Your Email"}
        </h1>

        <p className="my-4 text-base leading-6">
          {!emailSent
            ? "We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
            : `We have sent the reset email to ${email}. Please check your inbox.`}
        </p>

        <form onSubmit={handleSubmit}>
          {!emailSent && (
            <>
              <label className="w-full">
                <p className="mb-1 text-sm">
                  Email Address <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className={`w-full p-3 rounded-md border focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-green-600"
                  }`}
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className={`mt-6 w-full py-3 px-4 rounded-md font-medium transition-all ${
              isDarkMode
                ? "bg-green-500 hover:bg-green-400 text-gray-900"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            {!emailSent ? "Submit" : "Resend Email"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <Link to="/">
            <p
              className={`flex items-center gap-2 transition ${
                isDarkMode
                  ? "text-gray-100 hover:text-green-300"
                  : "text-gray-700 hover:text-green-500"
              }`}
            >
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

