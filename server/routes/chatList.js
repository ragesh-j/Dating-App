const mongoose=require('mongoose')
const router=require('express').Router()
const ProfileModel=require("../models/profileModel")
const UserModel=require("../models/UserModel")
const ConversationModel=require("../models/conversationModel")
const authenticateToken = require("../middleware/authenticeToken");

router.get('/chat-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const conversations = await ConversationModel.aggregate([
      {
        $match: { members: userId } 
      },
      {
        $unwind: '$members' 
      },
      {
        $match: { members: { $ne: userId } } 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'members', 
          foreignField: 'user', 
          as: 'profile'
        }
      },
      {
        $unwind: '$profile' 
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'members', 
          foreignField: '_id', 
          as: 'user' 
        }
      },
      {
        $unwind: '$user' 
      },
      {
        $project: {
          _id: '$profile.user', 
          firstName: '$user.first_name', 
          lastName: '$user.last_name', 
          profileImage: '$profile.profileImage' 
        }
      }
    ]);
      res.status(200).json(conversations)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
 module.exports=router