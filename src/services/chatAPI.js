import { setLoading } from "../slices/LoadingSlice";
import { refreshWeb } from "../slices/RefreshSlice";
import { apiConnector } from "./apiConnector"
import { chatEndpoints } from './apis'
import {toast} from 'react-toastify'
const {
    ACCESSCHATS_API,FETCHCHATS_API,FETCHALLGROUPS_API,
    CREATEGROUP_API,GROUPEXIT_API,ADDSELFTOGROUP_API,UNSEEN_API
} = chatEndpoints;

export function createGroup(groupName,token){
    return async (dispatch) => {
       dispatch(setLoading(true))
      try {
        
        const response = await apiConnector("POST", CREATEGROUP_API,{groupName},{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("CREATEGROUP API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
        dispatch(refreshWeb())
        dispatch(setLoading(false))
        toast.success("Group Created",{theme: "dark"})
        return response.data
      } catch (error) {
        dispatch(setLoading(false))
        console.log("CREATEGROUP API ERROR............", error)
        toast.error("Group is not created",{theme: "dark"})
      }
       
    }
}

export function fetchGroups(token,search=""){
    return async (dispatch) => {
      if(search == ""){
        dispatch(setLoading(true))
      }
       
      try {
        const url = `${FETCHALLGROUPS_API}${search ? `?search=${encodeURIComponent(search)}` : ""}`;
        const response = await apiConnector("POST",url,null,{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("FETCHALLGROUPS API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
  
        dispatch(setLoading(false))
        return response.data
      } catch (error) {
        dispatch(setLoading(false))
        console.log("FETCHALLGROUPS API ERROR............", error)
      }
    }
}

export function exitGroup(groupId,token){
  return async (dispatch) => {
     dispatch(setLoading(true))
    try {
      
      const response = await apiConnector("POST",GROUPEXIT_API,{groupId},{
        Authorization: `Bearer ${token}`,
      })

      console.log("GROUPEXIT API RESPONSE............", response)

      if (!response.data.success){
        throw new Error(response.data.message)
      }
      dispatch(refreshWeb())
      dispatch(setLoading(false))
      toast.success("Group left",{theme: "dark"})
      return response.data
    } catch (error) {
      dispatch(setLoading(false))
      console.log("GROUPEXIT API ERROR............", error)
      toast.error("Group leave failed",{theme: "dark"})
    }
  }
}

export function addSelfToGroup(groupId,token){
    return async (dispatch) => {
       dispatch(setLoading(true))
      try {
        
        const response = await apiConnector("POST",ADDSELFTOGROUP_API,{groupId},{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("ADDSELFTOGROUP API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
        dispatch(refreshWeb())
        dispatch(setLoading(false))
        return response.data
      } catch (error) {
        dispatch(setLoading(false))
        console.log("ADDSELFTOGROUP API ERROR............", error)
      }
    }
}

export function accessChats(friendId,friendName,token){
  return async (dispatch) => {
     dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST",ACCESSCHATS_API,{friendId,friendName},{
        Authorization: `Bearer ${token}`,
      })
      console.log("ADDSELFTOGROUP API RESPONSE............", response)
      if (!response.data.success){
        throw new Error(response.data.message)
      }
      dispatch(refreshWeb())
      dispatch(setLoading(false))
      return response.data
    } catch (error) {
      dispatch(setLoading(false))
      console.log("ADDSELFTOGROUP API ERROR............", error)
    }
  }
}

export function fetchChats(token,search=""){
  return async (dispatch) => {
     
    try {
      const url = `${FETCHCHATS_API}${search ? `?search=${encodeURIComponent(search)}` : ""}`;
      const response = await apiConnector("POST",url,null,{
        Authorization: `Bearer ${token}`,
      })
      
      console.log("FETCHCHATS API RESPONSE............", response)

      if (!response.data.success){
        throw new Error(response.data.message)
      }

      
      return response.data
    } catch (error) {
      
      console.log("FETCHCHATS API ERROR............", error)
    }
  }
}

export function unseenCount(token,chatId){
  return async (dispatch) => {
    try {
     
      const response = await apiConnector("POST",UNSEEN_API,{chatId},{
        Authorization: `Bearer ${token}`,
      })
      
      console.log("UNSEEN API RESPONSE............", response)

      if (!response.data.success){
        throw new Error(response.data.message)
      }

      
      return response.data
    } catch (error) {
      
      console.log("UNSEEN API ERROR............", error)
    }
  }
}
