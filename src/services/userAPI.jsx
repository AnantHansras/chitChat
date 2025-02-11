// import { toast } from "react-hot-toast"
// import { setToken } from "../../slices/authSlice"
// import { setUser } from "../../slices/profileSlice"
import {toast} from 'react-toastify'
import {setLoading} from '../slices/LoadingSlice'
import { apiConnector } from "./apiConnector"
import { userEndpoints } from './apis'

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  FETCHUSERS_API
} = userEndpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
     dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

    
      navigate("/verify-email")
      toast.success("OTP Sent Successfully",{theme: "dark"})
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      const errorMessage =
        error?.response?.data?.message || // API error message
        error?.message || // Custom error from throw
        "Something went wrong"; // Default fallback

      toast.error(errorMessage, { theme: "dark" });
    }
    dispatch(setLoading(false))
  }
}

export function signUp(name,email,password,otp,navigate) {
  return async (dispatch) => {

    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    toast.success("Signup Successful",{theme: "dark"})
      navigate("/")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      
      const errorMessage =
      error?.response?.data?.message || // API error message
      error?.message || // Custom error from throw
      "Something went wrong"; // Default fallback

    toast.error(errorMessage, { theme: "dark" });
      navigate("/signup")
    }
     dispatch(setLoading(false))
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
     dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

       toast.success("Login Successful",{theme: "dark"})
    //   dispatch(setToken(response.data.token))
      
    //   dispatch(setUser({ ...response.data.user}))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/main/allusers")

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      const errorMessage =
        error?.response?.data?.message || // API error message
        error?.message || // Custom error from throw
        "Something went wrong"; // Default fallback

      toast.error(errorMessage, { theme: "dark" });
    }
     dispatch(setLoading(false))
  }
}

export function logout(navigate) {
    return (dispatch) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out",{theme: "dark"})
      navigate("/")
    }
}

export function fetchUsers(token,search=""){
  return async (dispatch) => {
    if(search == ""){
      dispatch(setLoading(true))
    }
     
    try {
      const url = `${FETCHUSERS_API}${search ? `?search=${encodeURIComponent(search)}` : ""}`;
      const response = await apiConnector("GET", url,null,{
        Authorization: `Bearer ${token}`,
      })

      console.log("FETCHUSERS API RESPONSE............", response)

      if (!response.data.success){
        throw new Error(response.data.message)
      }

      dispatch(setLoading(false))
      return response.data
    } catch (error) {
      dispatch(setLoading(false))
      console.log("FETCHUSERS API ERROR............", error)
    }
     
  }
}

