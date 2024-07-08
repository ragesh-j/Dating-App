const mongoose=require('mongoose')
const router=require('express').Router()
const ProfileModel=require("../models/profileModel")
const UserModel=require("../models/UserModel")
const RequestModel=require("../models/requestModel")
const authenticateToken = require("../middleware/authenticeToken");

router.get('/sent-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const sentRequest = await RequestModel.aggregate([
      {
        $match: { sender: userId } 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'receiver', 
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
          localField: 'receiver', 
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
      res.status(200).json(sentRequest)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
 module.exports=router