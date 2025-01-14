import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { tokenPassword } from "../services/password";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tokenPassword(email,setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="max-w-[500px] p-4 lg:p-8 bg-white bg-opacity-20 shadow-md rounded-md">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-green-300">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-green-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleSubmit}>
            {!emailSent && (
              <>
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-green-200">
                    Email Address <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="form-style w-full rounded-md p-3 bg-green-100 text-green-900 border border-green-300 focus:ring-2 focus:ring-green-500"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-green-600 py-[12px] px-[12px] font-medium text-white hover:bg-green-700"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-green-300 hover:text-green-500">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>

    </div>
  );
}

export default ForgotPassword;
