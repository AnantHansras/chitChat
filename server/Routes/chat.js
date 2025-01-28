const express = require("express")
const router = express.Router()
const {auth} =require('../middlewares/auth')

const {accessChats,fetchChats,fetchAllGroups,
    createGroup,groupExit,addSelfToGroup,unSeenMessages
} = require('../controllers/chat')

router.post("/accesschats",auth, accessChats);
router.post("/fetchchats",auth, fetchChats);
router.post("/fetchallgroups",auth, fetchAllGroups);
router.post("/creategroup",auth, createGroup);
router.post("/groupexit",auth, groupExit);
router.post("/addselftogroup",auth, addSelfToGroup);
router.post("/unseen",auth, unSeenMessages);
module.exports = router;