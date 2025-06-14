const express = require("express")
const router = express.Router()
const {resetPasswordToken,resetPassword} = require('../controllers/resetPassword')
const {jwtCheck} =require('../middlewares/auth')

router.post('/passwordtoken',resetPasswordToken);
router.post('/resetpassword',resetPassword);
module.exports = router;