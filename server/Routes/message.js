const express = require("express")
const router = express.Router()
const {auth} = require('../middlewares/auth')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {allMessages,sendMessage,deleteMessage,reactToMessage} = require('../controllers/message');
router.post('/allmsgs',auth,allMessages);
router.post('/sendmsg',auth,upload.single('file'),sendMessage);
router.post('/deletemsg',auth, deleteMessage);
router.post('/reacttomsg',auth, reactToMessage);
module.exports = router;