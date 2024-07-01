const express = require('express');
const router = express.Router();
const LocationModel = require('../models/locationModel');
const ProfileModel=require("../models/profileModel")
const authenticateTok = require('../middleware/authenticeToken'); 
const mongoose=require('mongoose')

router.post('/save-location', authenticateTok, async (req, res) => {
  const { latitude, longitude } = req.body;
  const userId = req.user.userId; 

  try {
    
    let location = await LocationModel.findOne({ user: userId });
    if (location) {
      
      location.location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    } else {
     
      location = new LocationModel({
        user: userId,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
    }

    await location.save();
    res.status(200).json({ message: 'Location saved successfully', location });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/nearby-users', authenticateTok, async (req, res) => {
    const userId = req.user.userId;
    try {
        const userLocation = await LocationModel.findOne({ user: userId });

        if (!userLocation) {
            return res.status(400).send('User location not found');
        }

        const userProfile = await ProfileModel.findOne({ user: userId });
        if (!userProfile) {
            return res.status(400).send('User profile not found');
        }

        const genderPreference = userProfile.genderPreference;
       
        let genderFilter = [];
        if (genderPreference === 'Both') {
            genderFilter = ['Male', 'Female'];
        } else {
            genderFilter = [genderPreference];
        }

        const nearbyUsers = await LocationModel.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: userLocation.location.coordinates },
                    distanceField: 'distance',
                    maxDistance: 50000, 
                    spherical: true,
                },
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: 'user', 
                    foreignField: '_id', 
                    as: 'userDetails', 
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $lookup: {
                    from: 'profiles', 
                    localField: 'user', 
                    foreignField: 'user', 
                    as: 'profileDetails', 
                },
            },
            {
                $unwind: '$profileDetails',
            },
            {
                $match: { 
                    'userDetails._id': { $ne: new mongoose.Types.ObjectId(userId) },
                    'profileDetails.gender': { $in: genderFilter } 
                },
            },
            {
                $project: {
                    user: 1,
                    location: 1,
                    distance: 1,
                    'userDetails.first_name': 1,
                    'userDetails.last_name': 1,
                    'profileDetails.profileImage': 1,
                    'profileDetails.gender': 1,
                    'profileDetails.age': 1,
                    'profileDetails.occupation': 1,
                    'profileDetails.bio': 1,
                },
            },
        ]);

        res.json(nearbyUsers);
    } catch (error) {
        console.error('Error finding nearby users:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;