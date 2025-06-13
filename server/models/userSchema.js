const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type:"String",
        require:true
    },
    email : {
        type:"String",
        require:true
    },
    auth0Id : {
        type:"String",
        require:true,
        unique:true
    },
},{
    timestamps : true
});

module.exports = mongoose.model("User",userSchema)