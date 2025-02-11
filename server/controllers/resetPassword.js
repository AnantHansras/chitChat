const User = require("../models/userSchema");
const mailSender = require("../config/mailsender");
const bcrypt = require('bcrypt')
const crypto = require("crypto");

//resetPasswordToken
const resetPasswordToken = async (req,res) =>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered"
            });
        }

        const token = crypto.randomBytes(20).toString("hex");
        
        const updatedUser = await User.findOneAndUpdate({email},{token:token,resetPasswordExpires: Date.now() + 5*60*1000},{new:true});
        console.log(updatedUser);

        const URL = `https://chitchat-frontend-2lit.onrender.com/update-password/${token}`;

        await mailSender(email,"Password Reset link from chitChat : ",URL);

        return res.json({
            success:true,
            message:"Reset Password token generated successfully",
            token
        });
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        });
    }
}

//resetPassword
const resetPassword = async (req,res) => {
    try{
        
        const {password,confirmPassword,token} = req.body;

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and confirmPassword do not match"
            });
        }

        const userDetails = await User.findOne({token});

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                sucess:false,
                message:"Token is expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate({token},{password : hashedPassword},{new:true});

        return res.json({
            success:true,
            message:"Password reset successfully"
        });

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        });
    }
}

module.exports = {resetPassword,resetPasswordToken}