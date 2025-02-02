const BASE_URL= process.env.REACT_APP_BASE_URL

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
    DELETEMESSAGE_API : BASE_URL + '/message/deletemsg',
    REACTTOMESSAGE_API : BASE_URL + '/message/reacttomsg'
}

export const passwordEndpoints = {
    PASSWORDTOKEN_API : BASE_URL + '/password/passwordtoken',
    RESETPASSWORD_API : BASE_URL + '/password/resetpassword'
}