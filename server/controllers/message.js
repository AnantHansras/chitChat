const Chat = require('../models/chatSchema');
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');
const dotenv = require('dotenv');
dotenv.config();
const {uploadImageToCloudinary} = require('../config/imageUploader');

const allMessages = async(req,res) =>{
    try{
        const chatId = req.body.chatId;
        // const msgs = await Message.find({chat:chatId})
        // .populate('sender','name email')
        // .populate('chat')
        // .sort({ createdAt: -1 })
        await Message.updateMany(
            { chat: chatId, seenBy: { $ne: req.user.id } }, // Only update if the user hasn't already seen the message
            { $addToSet: { seenBy: req.user.id } } // Add userId to seenBy array
          );
      
          const msgs = await Message.find({ chat: chatId })
            .populate('sender', 'name email')
            .populate('chat')
            .populate('seenBy', 'name email') // Populate the seenBy field to get user info
            .sort({ createdAt: -1 });

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

const sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        let imageUrl = null;

        // Validate input
        if (!chatId || (!content && !req.file)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a message content or an image.',
            });
        }

        // Handle image upload if present
        if (req.file) {
            const uploadedImage = await uploadImageToCloudinary(req.file.path,
                process.env.FOLDER_NAME,
                1000,
                1000);
            imageUrl = uploadedImage.secure_url;
        }

        let newMsg = {
            sender: req.user.id,
            content: content || '', // Allow empty content if there's an image
            chat: chatId,
            imageUrl: imageUrl, // Include imageUrl if available
        };

        let msg = await Message.create(newMsg);

        msg = await msg.populate('sender', 'name');
        msg = await msg.populate('chat');
        msg = await User.populate(msg, { path: 'chat.users', select: 'name email' });

        // Update the latest message in the chat
        await Chat.findByIdAndUpdate(chatId, { latestMessage: msg });

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            data: msg,
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const deleteMessage = async (req, res) => {
    const { msgId } = req.body;

    // Validate input
    if (!msgId) {
        return res.status(400).json({
            success:false,
            message:"Message ID is required" 
        })
    }

    try {
        const result = await Message.findByIdAndDelete(msgId);

        if (!result) {
            return res.status(400).json({
                success:false,
                message:"Message Not found" 
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message Deleted successfully" 
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
};

const reactToMessage = async (req, res) => {
    try {
        
        const { emoji, msgId } = req.body;
        const userId = req.user.id;
        
        const message = await Message.findById(msgId);
        if (!message) {
            return res.status(404).json({success:false, error: 'Message not found' });
        }
        const existingReaction = message.reactions.find(reaction => reaction.user.toString() === userId);

        if (existingReaction) {
            existingReaction.emoji = emoji;
        } else {
            message.reactions.push({ user: userId, emoji });
        }
        await message.save();

        res.status(200).json({success:true, message: 'Reaction added/updated successfully', data: message });
    } catch (error) {
        console.error('Error reacting to message:', error);
        res.status(500).json({success:false, error: 'An error occurred while reacting to the message' });
    }
};



module.exports = {sendMessage,allMessages,deleteMessage,reactToMessage}
