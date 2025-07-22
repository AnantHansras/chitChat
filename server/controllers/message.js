const Chat = require('../models/chatSchema');
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');
const dotenv = require('dotenv');
dotenv.config();
const {uploadImageToCloudinary} = require('../config/imageUploader');
const {geminichatSession} = require('../config/gemini');
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
            .populate('sender', 'name email auth0Id') // Populate the sender field to get user info
            .populate('chat')
            .populate('seenBy', 'name email auth0Id') // Populate the seenBy field to get user info
            .sort({ createdAt: 1 });

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

const allBotMessages = async (req, res) => {
  try {
    // find the bot chat for the user
    const botChat = await Chat.findOne({
      isGroupChat: false,
      isBot: true,
      users: req.user.id,
    });

    if (!botChat) {
      return res.status(404).json({
        success: false,
        message: "Bot chat not found",
      });
    }

    const chatId = botChat._id;

    // mark all unseen messages as seen by this user
    await Message.updateMany(
      { chat: chatId, seenBy: { $ne: req.user.id } },
      { $addToSet: { seenBy: req.user.id } }
    );

    // fetch all messages in the bot chat
    const msgs = await Message.find({ chat: chatId })
      .populate("sender", "name email auth0Id")
      .populate("chat")
      .populate("seenBy", "name email auth0Id")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: msgs,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

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
            seenBy: [req.user.id], 
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

const sendBotMessage = async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = null;

    // Validate input
    if (!content && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message content or an image.",
      });
    }

    // find the bot chat
    const botChat = await Chat.findOne({
      isGroupChat: false,
      isBot: true,
      users: req.user.id,
    });

    if (!botChat) {
      return res.status(404).json({
        success: false,
        message: "Bot chat not found.",
      });
    }

    // Handle image upload if present
    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(
        req.file.path,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      imageUrl = uploadedImage.secure_url;
    }

    let newMsg = {
      sender: req.user.id,
      content: content || "", // Allow empty if image
      chat: botChat._id,
      imageUrl: imageUrl,
      seenBy: [req.user.id],
    };

    let msg = await Message.create(newMsg);

    msg = await msg.populate("sender", "name");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name email",
    });

    // Update the latest message in the chat
    await Chat.findByIdAndUpdate(botChat._id, { latestMessage: msg });

    return res.status(200).json({
      success: true,
      message: "Message sent to bot successfully",
      data: msg,
    });
  } catch (e) {
    console.error(e);
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

// const getChatbotReply = async (content) => {
//   const text = content.trim().toLowerCase();

//   if (text.includes("hello") || text.includes("hi")) {
//     return "Hello 👋! How can I assist you today?";
//   }

//   if (text.includes("help")) {
//     return "Sure, I’m here to help. Please tell me more about what you need.";
//   }

//   if (text.includes("thanks") || text.includes("thank you")) {
//     return "You’re welcome! 😊";
//   }

//   return "Hmm… let me think about that 🤔.";
// };

const getChatbotReply = async (content) => {
  const text = content.trim().toLowerCase();

  // Fallback to Gemini for other inputs
  try {
    const prompt = `
You are a friendly and intelligent AI chatbot. Reply to the user's message in a natural, conversational tone. Keep the response brief, helpful, and engaging. Avoid repeating the user's input.

User: ${content}
AI:
`;


    const result = await geminichatSession.sendMessage(prompt);
    const reply = await result.response.text();
    return reply.trim();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Oops! I had trouble thinking that through. Try again?";
  }
};

const sendMessageToBot = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
    }

    const userId = req.user.id;

    // 🔍 Find bot chat with this user
    const botChat = await Chat.findOne({
      isGroupChat: false,
      isBot: true,
      users: userId,
    });

    if (!botChat) {
      return res.status(404).json({
        success: false,
        message: 'Bot chat not found for this user.',
      });
    }

    const botUserId = 'nova_bot_user_id';

    const botReplyContent = await getChatbotReply(content);

    // 📝 Save bot's message
    let botMsg = await Message.create({
      sender: null,
      content: botReplyContent,
      chat: botChat._id,
      seenBy: [], 
    });

    // Update latest message to botMsg
    await Chat.findByIdAndUpdate(botChat._id, { latestMessage: botMsg });

    return res.status(200).json({
      success: true,
      message: 'User and bot messages sent successfully',
      data: {
        userMessage: userMsg,
        botMessage: botMsg,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {sendBotMessage,allBotMessages,sendMessage,allMessages,deleteMessage,reactToMessage,sendMessageToBot}
