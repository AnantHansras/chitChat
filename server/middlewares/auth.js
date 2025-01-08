//Checking if a user has provided valid credentials to log in. - > authentication
//Allowing a logged-in user to view specific pages or perform certain actions based on their role. -> authrization
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//islogin =>auth
const auth = async (req,res,next) => {
    try{
        
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ",""); 
        //const token = req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            console.log('JWT verification error:', err.name);  
            console.log('Error message:', err.message); 
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        });
    }
}

module.exports = {auth}