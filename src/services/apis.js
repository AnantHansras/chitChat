const BASE_URL = "https://chitchat-backend-22lq.onrender.com";
export const userEndpoints = {
    SENDOTP_API : BASE_URL+"/user/sendotp",
    SIGNUP_API : BASE_URL+"/user/signup",
    LOGIN_API : BASE_URL+"/user/login",
    FETCHUSERS_API: BASE_URL+"/user/fetchusers"
}

export const chatEndpoints = {
    ACCESSCHATS_API : BASE_URL + "/chat/accesschats",
    FETCHCHATS_API : BASE_URL + "/chat/fetchchats",
    FETCHALLGROUPS_API : BASE_URL + "/chat/fetchallgroups",
    CREATEGROUP_API : BASE_URL + "/chat/creategroup",
    GROUPEXIT_API : BASE_URL + "/chat/groupexit",
    ADDSELFTOGROUP_API : BASE_URL + "/chat/addselftogroup",
    UNSEEN_API : BASE_URL + "/chat/unseen"
}

export const msgEndpoints = {
    ALLMESSAGES_API : BASE_URL + '/message/allmsgs',
    SENDMESSAGE_API : BASE_URL + '/message/sendmsg',
    SENDBOTMESSAGE_API : BASE_URL + '/message/sendbotmsg', 
    DELETEMESSAGE_API : BASE_URL + '/message/deletemsg',
    REACTTOMESSAGE_API : BASE_URL + '/message/reacttomsg',
    ALLBOTMESSAGES_API : BASE_URL + '/message/allbotmsgs',
    CHATBOT_API : BASE_URL + '/message/chatbot',
}

export const passwordEndpoints = {
    PASSWORDTOKEN_API : BASE_URL + '/password/passwordtoken',
    RESETPASSWORD_API : BASE_URL + '/password/resetpassword'
}