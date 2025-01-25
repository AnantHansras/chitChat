const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    seenBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    imageUrl: {
        type: String, // Field to store the image URL
        required: false // Optional field
    },
    reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            emoji: {
                type: String, 
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Message",msgSchema)