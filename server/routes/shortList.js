const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()
const ShortListModel=require('../models/shortListModel')
const authenticateToken=require('../middleware/authenticeToken');


router.post('/shortlist', authenticateToken, async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user.userId;
    
    try {
        const existingRequest = await ShortListModel.findOne({ shortListedBy: senderId, shortListed: receiverId });

        if (existingRequest) {
            return res.status(400).json({message:'Already shortlsited'});
        }

        const newRequest = new ShortListModel({
            shortListedBy: senderId,
            shortListed: receiverId,
        });
        
        await newRequest.save();
        
        res.status(201).json({message:'Shortlisted successfully completed'});
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({message:'Server Error'});
    }
});

router.get('/shortList-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const shortlist = await ShortListModel.aggregate([
      {
        $match: { shortListedBy: userId } 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'shortListed', 
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
          localField: 'shortListed', 
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
      res.status(200).json(shortlist)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.get('/shortListedBy-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const shortlist = await ShortListModel.aggregate([
      {
        $match: { shortListed: userId } 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'shortListedBy', 
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
          localField: 'shortListedBy', 
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
      res.status(200).json(shortlist)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports=router