const express=require('express')
const authenticateToken=require('../middleware/authenticeToken')
const MessageModel=require('../models/messageModel')
const router=express.Router()

router.post("/message",authenticateToken,async(req,res)=>{
    const senderId=req.user.userId
    const{conversationId,text}=req.body
    try{
        const newMessage=new MessageModel({
            conversationId,
            senderId,
            text
        })
    const saveMessage=await newMessage.save()
    res.status(200).json(saveMessage)
         
    }catch(err){
        res.status(500).json(err)
    }
});

router.get("/message/:conversationId",authenticateToken,async(req,res)=>{
   
   const userId=req.user.userId
    const id=req.params.conversationId
    try{
        const message=await MessageModel.find({
            conversationId:id
        })
        res.status(200).json({userId,message})
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router