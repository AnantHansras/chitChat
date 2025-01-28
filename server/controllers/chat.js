const Chat = require('../models/chatSchema')
const User = require('../models/userSchema')
const Message = require('../models/messageSchema')
const mongoose = require('mongoose')
const accessChats = async (req, res) => {
    try {
        const { friendId,friendName } = req.body;
    
        if (!friendId || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ success: false, message: 'Invalid friend ID' });
        }

        let chat = await Chat.findOne({
            isGroupChat:false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: friendId } } }
            ]
        }).populate("users", "-password") 
          .populate("latestMessage"); 

          chat = await User.populate(chat, {
            path: "latestMessage.sender",
            select: "name email",
          });

        if (chat) {
            // If a chat exists, return the chat details
            return res.status(200).json({
                success: true,
                data: chat
            });
        } 
        else {
            
            const newChat = new Chat({
                chatName:friendName,
                isGroupChat:false,
                users: [req.user.id, friendId], // Create a chat between the user and their friend
            });

            // Save the new chat to the database
            await newChat.save();

            // Return the newly created chat
            return res.status(201).json({
                success: true,
                data: newChat
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const fetchChats = async (req,res) =>{
    try{
        const search = req.query.search;
        let query = {};
        if(search){
            query = {chatName:{$regex:search,$options:'i'}};
        }
        let results = await Chat.find(query).find({users :{ $elemMatch:{$eq:req.user.id}}})
        .populate("users","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        // .then(async (results) =>{
        //     results = await User.populate(results,{path:"latestMessage.sender",select:"name email"});
        // })
        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name email",
          });
        return res.status(200).json({
            success:true,
            data:results
        })
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const fetchAllGroups = async (req, res) => {
    try {
        const search = req.query.search || "";

        // Build the query object
        const query = { isGroupChat: true };

        // Add the name filter if search is not empty
        if (search) {
            query.chatName = { $regex: search, $options: "i" };
        }

        // Fetch all groups matching the query
        const allGroups = await Chat.find(query);

        return res.status(200).json({
            success: true,
            data: allGroups,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching groups",
        });
    }
};

const createGroup = async (req, res) => {
    try {
        const adminId = req.user.id; 
        const { groupName } = req.body; 
        if (!groupName) {
            return res.status(400).json({
                success: false,
                message: "Group name is required"
            });
        }

        const newGroup = new Chat({
            isGroupChat: true,
            chatName: groupName, 
            groupAdmin: adminId, 
            users: [adminId], 
            latestMessage: null, 
        });

        await newGroup.save();

        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            group: newGroup
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Server error while creating the group"
        });
    }
};

const groupExit = async (req, res) => {
    try {
        const userId = req.user.id; 
        const groupId = req.body.groupId; 
        const group = await Chat.findById(groupId);
        
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        if (!group.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User is not part of the group"
            });
        }
        
        if (group.groupAdmin.toString() === userId.toString()) {
            await Chat.deleteOne({ _id: groupId });

            return res.status(200).json({
                success: true,
                message: "Group deleted successfully because admin left"
            });
        }
        group.users = group.users.filter(user => user.toString() !== userId.toString());

        await group.save();

        return res.status(200).json({
            success: true,
            message: "User removed from the group successfully",
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const addSelfToGroup = async (req, res) => {
    try {
        const userId = req.user.id; 
        const groupId = req.body.groupId;

        const group = await Chat.findById(groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        if (group.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You are already a member of the group"
            });
        }

        group.users.push(userId);
        await group.save();

        return res.status(200).json({
            success: true,
            message: "You have been successfully added to the group",
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const unSeenMessages = async (req, res) => {
    const chatId = req.body.chatId;
    const userId = req.user.id; // Assuming userId is available in req.user from authentication middleware

    try {
        // Validate input
        if (!chatId) {
            return res.status(400).json({ success: false, message: "Chat ID is required" });
        }

        // Count messages from the chat that are unseen by the current user
        const unseenMessageCount = await Message.countDocuments({
            chat: chatId,
            seenBy: { $ne: userId } // Messages not seen by the current user
        });

        // Return count of unseen messages
        res.status(200).json({
            success: true,
            unseenMessageCount,
        });
    } catch (error) {
        console.error("Error fetching unseen message count: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
module.exports = {unSeenMessages, accessChats,fetchChats,fetchAllGroups,createGroup ,groupExit,addSelfToGroup};