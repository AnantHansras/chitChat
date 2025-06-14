const express = require("express")
const router = express.Router()
const {jwtCheck} = require('../middlewares/auth')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {allMessages,sendMessage,deleteMessage,reactToMessage} = require('../controllers/message');
router.post('/allmsgs',jwtCheck,allMessages);
router.post('/sendmsg',jwtCheck,upload.single('file'),sendMessage);
router.post('/deletemsg',jwtCheck, deleteMessage);
router.post('/reacttomsg',jwtCheck, reactToMessage);
module.exports = router;