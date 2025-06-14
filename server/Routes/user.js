const express = require("express")
const router = express.Router()
const {loginController,signupController,sendotpController,fetchusersController} = require('../controllers/user')
const jwtCheck =require('../middlewares/auth')

router.post('/login',loginController);
router.post('/signup',signupController);
router.post("/sendotp", sendotpController);
router.get("/fetchusers",jwtCheck, fetchusersController);

module.exports = router;