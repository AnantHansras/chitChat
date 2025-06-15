//Checking if a user has provided valid credentials to log in. - > authentication
//Allowing a logged-in user to view specific pages or perform certain actions based on their role. -> authrization
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//islogin =>auth
// const auth = async (req,res,next) => {
//     try{
        
//         const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ",""); 
//         //const token = req.header("Authorization").replace("Bearer ","");
//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is missing"
//             });
//         }
//         try{
//             const decode = await jwt.verify(token,process.env.JWT_SECRET);
//             req.user = decode;
//         }
//         catch(err){
//             console.log('JWT verification error:', err.name);  
//             console.log('Error message:', err.message); 
//             return res.status(401).json({
//                 success:false,
//                 message:"token is invalid"
//             });
//         }
//         next();
//     }
//     catch(err){
//         return res.status(401).json({
//             success:false,
//             message:err.message
//         });
//     }
// }

const { auth } = require('express-oauth2-jwt-bearer');
const User = require('../models/userSchema');
const jwtCheck = auth({
  audience: 'https://myapi.express.com',
  issuerBaseURL: 'https://dev-603dj73x820iet0b.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const checkJwtWithLocalUser = [
  (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Incoming Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" ,data:req.auth,authHeader:authHeader});
    }

    // Optional: Just return the raw token info for debugging
    // return res.status(200).json({ message: "Token received", token: authHeader });

    next(); // continue to jwtCheck
  },
  jwtCheck, // ✅ first validate the token
  async (req, res, next) => {
    try {
      console.log("yele",req.auth);
      const auth0Id = req.auth?.payload.sub;
      console.log("Auth0 ID:", auth0Id);
      if (!auth0Id) {
        return res.status(401).json({ message: 'Auth0 user ID missing' ,data:auth0Id});
      }

      const user = await User.findOne({ auth0Id });
      if (!user) {
        return res.status(404).json({ message: 'User not found in local DB' });
      }

      req.user = user; // ✅ attach local user to req.user
      next();
    } catch (err) {
      console.error("Error in checkJwtWithLocalUser:", err);
      res.status(500).json({ message: 'Server error during user lookup' });
    }
  }
];

module.exports = checkJwtWithLocalUser;