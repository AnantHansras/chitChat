const express = require("express")
const router = express.Router()
const jwtCheck =require('../middlewares/auth')

const {accessChats,fetchChats,fetchAllGroups,
    createGroup,groupExit,addSelfToGroup,unSeenMessages
} = require('../controllers/chat')

router.post("/accesschats",jwtCheck, accessChats);
router.post("/fetchchats",jwtCheck, fetchChats);
router.post("/fetchallgroups",jwtCheck, fetchAllGroups);
router.post("/creategroup",jwtCheck, createGroup);
router.post("/groupexit",jwtCheck, groupExit);
router.post("/addselftogroup",jwtCheck, addSelfToGroup);
router.post("/unseen",jwtCheck, unSeenMessages);
module.exports = router;
//https://myapi.express.com