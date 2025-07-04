const express = require("express")
const router = express.Router()
const jwtCheck = require('../middlewares/auth')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {allMessages,sendMessage,deleteMessage,reactToMessage,allBotMessages,sendBotMessage} = require('../controllers/message');
router.post('/allmsgs',jwtCheck,allMessages);
router.post('/sendmsg',jwtCheck,upload.single('file'),sendMessage);
router.post('/sendbotmsg-*',jwtCheck,upload.single('file'),sendBotMessage);
router.post('/deletemsg',jwtCheck, deleteMessage);
router.post('/reacttomsg',jwtCheck, reactToMessage);
router.post('/allbotmsgs', jwtCheck, allBotMessages);
module.exports = router;