const express = require("express")
const router = express.Router()
const {auth} = require('../middlewares/auth')

const {allMessages,sendMessage} = require('../controllers/message');
router.post('/allmsgs',auth,allMessages);
router.post('/sendmsg',auth,sendMessage);

module.exports = router;