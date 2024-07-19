const express=require('express')
const ConversationModel=require("../../models/conversationModel")
const router=express.Router()
const authenticateToken=require("../../middleware/authenticeToken")

router.post('/conversations', authenticateToken, async (req, res) => {
    const senderId = req.user.userId;
    const { receiverId } = req.body;
  
    try {
      
      const existingConversation = await ConversationModel.findOne({
        members: { $all: [senderId, receiverId] }
      });
  
      if (existingConversation) {
        res.status(200).json(existingConversation);
      } else {
        const newConversation = new ConversationModel({
          members: [senderId, receiverId]
        });
  
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/conversation/user",authenticateToken,async(req,res)=>{
    
    const userId=req.user.userId
    try{
        const conversation=await ConversationModel.find({
            members:{ $in: [userId]},
        })
        res.status(200).json(conversation)
    }catch(err){
       res.status(500).json(err)
    }
})

module.exports=router