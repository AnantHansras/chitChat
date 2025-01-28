import {setLoading} from '../slices/LoadingSlice'
import { apiConnector } from './apiConnector'
import { passwordEndpoints } from './apis'
import {toast} from 'react-toastify'
const {RESETPASSWORD_API,PASSWORDTOKEN_API} = passwordEndpoints;

export function tokenPassword(email,setEmailSent) {
    return async (dispatch) => {
      // const toastId = toast.loading("Loading...")
       dispatch(setLoading(true))
        try{
          
        const response = await apiConnector("POST", PASSWORDTOKEN_API, {
          email
        })
        console.log("PASSWORDTOKEN API RESPONSE............", response)
        
        console.log(response.data.success)
        setEmailSent(true)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Email sent Successfully",{theme: "dark"})
      } catch (error) {
        console.log("PASSWORDTOKEN API ERROR............", error)
        toast.error("Error occured while sending email",{theme: "dark"})
      }
      dispatch(setLoading(false))
    }
}
  

export function resetPassword(password,confirmPassword,token,navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
     dispatch(setLoading(true))
      try{
        
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,confirmPassword,token
      })
      console.log("RESETPASSWORD API RESPONSE............", response)
      
      console.log(response.data.success)
      navigate('/')
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Passowrd reset done",{theme: "dark"})
    } catch (error) {
      console.log("RESETPASSWORD API ERROR............", error)
      toast.error("Error while reseting password",{theme: "dark"})
    }
    dispatch(setLoading(false))
  }
}
