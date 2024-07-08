const mongoose=require('mongoose')
const router=require('express').Router()
const RequestModel=require("../models/requestModel")
const authenticateToken = require("../middleware/authenticeToken");

router.get('/received-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const sentRequest = await RequestModel.aggregate([
      {
        $match: { receiver: userId } 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'sender', 
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
          localField: 'sender', 
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
          profileImage: '$profile.profileImage',
          status:'$status' 
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