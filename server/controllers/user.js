const User = require('../models/userSchema')
const OTP = require('../models/otpSchema')
const dotenv = require('dotenv')
dotenv.config();
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req,res) =>{
    try{
        const {name,otp,email,password} = req.body;

        if(!name || !email || !otp || !password){
            return res.status(403).json({
                success:false,
                message:"Enter data in all fields"
            });
        }

        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(400).json({
                success:false,
                message:"User already exist so not able to signIn"
            });
        }

        const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);;
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            });
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            success:true,
            message:"Signed Up succesfully",
            user
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

const sendotpController = async (req,res) =>{
    try{
        console.log(req.header)
        console.log(req.body);
        const {email} = req.body;
        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(401).json({
                success:false,
                message:"User already exist so not able to signIn"
            });
        }
        let otp = otpGenerator.generate(6,{
            specialChars:false,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false
        });
        let otpInDB = await OTP.findOne({otp});
        while(otpInDB){
            otp = otpGenerator.generate(6,{
                specialChars:false,
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false
            });
            otpInDB = await OTP.findOne({otp});
        }
        // console.log("OTP : ",otp);
        const otpBody = await OTP.create({email,otp});
        //uske mail par otp send karo => done alreay by pre middleware in schema of otp.js
        //pre => OTP.create() se pahle run hoga
        return res.status(200).json({
            success:true,
            message:"OTP sent succesfully",
            otp
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
    
};

const loginController = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Enter data in all fields"
            });
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Please Sign up first"
            });
        }
        
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id : user._id
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"7d"
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 7*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in succesfully"
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Incorrect password"
            });
        }
    }
    catch(err){
        return res.status(403).json({
            success:false,
            message:err.message
        });
    }
};

const fetchusersController = async(req,res) =>{
    try{
        const userId = req.user.id;
        const {search} = req.query;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User Id not defined"
            });
        }
        let query = {};
        if(search){
            query = {name:{$regex:search,$options:'i'}};
        }
        const users = await User.find(query).find({_id:{$ne:userId}});
        return res.status(200).json({
            success:true,
            data:users
        });
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        });
    }
}

module.exports = {signupController,sendotpController,loginController,fetchusersController}