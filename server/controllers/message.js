const Chat = require('../models/chatSchema');
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');

const allMessages = async(req,res) =>{
    try{
        const chatId = req.body.chatId;
        const msgs = await Message.find({chat:chatId})
        .populate('sender','name email')
        .populate('chat')

        return res.status(200).json({
            success:true,
            data:msgs
        })
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const sendMessage = async(req,res) =>{
    try{
        const {content,chatId} = req.body;
        if(!chatId || !content){
            return res.status(400).json({
                success:false,
                message:'please write something in message'
            })
        }
        let newmsg = {
            sender : req.user.id,
            content:content,
            chat: chatId
        }

        let msg = await Message.create(newmsg);

        msg = await msg.populate('sender', 'name')
        msg = await msg.populate('chat')
        msg = await User.populate(msg,{path:'chat.users',select:'name email'})

        await Chat.findByIdAndUpdate(chatId,{latestMessage: msg})
        return res.status(200).json({
            success:true,
            message:'Msg sent Successfully'
        })
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

module.exports = {sendMessage,allMessages}
