import { setLoading } from "../slices/LoadingSlice";
import { refreshWeb } from "../slices/RefreshSlice";
import { apiConnector } from "./apiConnector";
import { msgEndpoints } from "./apis";

const {ALLMESSAGES_API,SENDMESSAGE_API,DELETEMESSAGE_API,REACTTOMESSAGE_API,ALLBOTMESSAGES_API,SENDBOTMESSAGE_API} = msgEndpoints


export function sendmsg(content,attachment,chatId,token){
    return async (dispatch) => {
      try {
        const formData = new FormData();
            formData.append('content', content);
            formData.append('chatId', chatId);
            if (attachment) {
                formData.append('file', attachment); // Append the file
            }
        // const file = attachment;
        const response = await apiConnector("POST",SENDMESSAGE_API,formData,{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("SENDMESSAGE API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
        dispatch(refreshWeb());
        return response.data
      } catch (error) {
        console.log("SENDMESSAGE API ERROR............", error)
      }
    }
}

export function sendbotdmsg(content,attachment,token){
    return async (dispatch) => {
      try {
        const formData = new FormData();
            formData.append('content', content);
            if (attachment) {
                formData.append('file', attachment); // Append the file
            }
        // const file = attachment;
        const response = await apiConnector("POST",SENDBOTMESSAGE_API,formData,{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("SENDBOTMESSAGE API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
        dispatch(refreshWeb());
        return response.data
      } catch (error) {
        console.log("SENDBOTMESSAGE API ERROR............", error)
      }
    }
}

export function allmsgs(chatId,token){
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST",ALLMESSAGES_API,{chatId},{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("ALLMESSAGES API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data)
        }
  
        return response.data
      } catch (error) {
        console.log("ALLMESSAGES API ERROR............", error)
      }
    }
}

export function allbotmsgs(token){
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST",ALLBOTMESSAGES_API,{
          Authorization: `Bearer ${token}`,
        })
  
        console.log("ALLBOTMESSAGES API RESPONSE............", response)
  
        if (!response.data.success){
          throw new Error(response.data.message)
        }
  
        return response.data
      } catch (error) {
        console.log("ALLBOTMESSAGES API ERROR............", error)
      }
    }
}

export function deletemsg(msgId,token){
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST",DELETEMESSAGE_API,{msgId},{
        Authorization: `Bearer ${token}`,
      })

      console.log("DELETEMESSAGE API RESPONSE............", response)

      if (!response.data.success){
        throw new Error(response.data.message)
      }
      dispatch(refreshWeb());
      return response.data
    } catch (error) {
      console.log("DELETEMESSAGE API ERROR............", error)
    }
  }
}

export function reacttomsg(emoji,msgId,token){
  return async (dispatch) => {
    try {
      
      const response = await apiConnector("POST",REACTTOMESSAGE_API,{emoji,msgId},{
        Authorization: `Bearer ${token}`,
      })
      

      console.log("REACTTOMESSAGE API RESPONSE............", response)
      
      if (!response.data.success){
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      console.log("REACTTOMESSAGE API ERROR............", error)
    }
  }
}