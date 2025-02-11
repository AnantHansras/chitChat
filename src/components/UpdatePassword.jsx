import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/password";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Redux state for theme

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div
      className={`flex justify-center items-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#f4f5f8] text-gray-900"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-sm p-6 shadow-md rounded-xl border-2 ${
          isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <h1
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Choose New Password
        </h1>
        <p className="my-3 text-base">
          Almost done. Enter your new password and you’re all set.
        </p>
        <form onSubmit={handleOnSubmit}>
          {/* Password Field */}
          <label className="relative">
            <p className="mb-1 text-sm">
              New Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className={`w-full rounded-md p-2 !pr-10 border focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-900 text-white border-gray-600 focus:ring-green-400"
                  : "bg-transparent text-gray-900 border-gray-300 focus:ring-green-500"
              }`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-10 cursor-pointer mt-2"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>

          {/* Confirm Password Field */}
          <label className="relative mt-3 block">
            <p className="mb-1 text-sm">
              Confirm New Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className={`w-full rounded-md p-2 !pr-10 border focus:ring-2 flex items-center ${
                isDarkMode
                  ? "bg-gray-900 text-white border-gray-600 focus:ring-green-400"
                  : "bg-transparent text-gray-900 border-gray-300 focus:ring-green-500"
              }`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-10 cursor-pointer mt-2"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-6 w-full rounded-md py-2 font-medium transition ${
              isDarkMode
                ? "bg-green-500 text-gray-100 hover:bg-green-400"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4">
          <Link to="/">
            <p
              className={`flex items-center gap-2 transition ${
                isDarkMode
                  ? "text-green-100 hover:text-green-300"
                  : "text-gray-600 hover:text-green-500"
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

export default UpdatePassword;
