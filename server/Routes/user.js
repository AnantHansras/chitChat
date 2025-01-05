const express = require("express")
const router = express.Router()
const {loginController,signupController,sendotpController,fetchusersController} = require('../controllers/user')
const {auth} =require('../middlewares/auth')

router.post('/login',loginController);
router.post('/signup',signupController);
router.post("/sendotp", sendotpController);
router.get("/fetchusers",auth, fetchusersController);

module.exports = router;