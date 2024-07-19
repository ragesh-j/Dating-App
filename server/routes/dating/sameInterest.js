const express = require('express');
const router = express.Router();
const ProfileModel=require("../../models/profileModel")
const authenticateToken = require('../../middleware/authenticeToken'); 
const mongoose=require('mongoose')

router.get('/users-by-interests', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
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
        const userInterests = userProfile.interests; 

        const usersByInterests = await ProfileModel.aggregate([
            
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
                $match: {
                    user: { $ne: new mongoose.Types.ObjectId(userId) }, 
                    interests: { $elemMatch: { $in: userInterests } }, 
                    gender: { $in: genderFilter }, 
                    doNotShowFor: { $ne: new mongoose.Types.ObjectId(userId) }
                },
            },

            {
                $project: {
                    'userDetails._id': 1,
                    'userDetails.first_name': 1,
                    'userDetails.last_name': 1,
                    'profileDetails':'$$ROOT'
                },
            },
            {
                $sample: { size: 10 },
              },
        ]);

        res.json(usersByInterests);
    } catch (error) {
        console.error('Error finding users by interests:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/users-by-qualification', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
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
        const userQualification = userProfile.qualification; 

        const usersByInterests = await ProfileModel.aggregate([
            
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
                $match: {
                    user: { $ne: new mongoose.Types.ObjectId(userId) }, 
                    qualification: userQualification, 
                    gender: { $in: genderFilter }, 
                    doNotShowFor: { $ne: new mongoose.Types.ObjectId(userId) }
                },
            },

            {
                $project: {
                    'userDetails._id': 1,
                    'userDetails.first_name': 1,
                    'userDetails.last_name': 1,
                    'profileDetails':'$$ROOT'
                },
            },
            {
                $sample: { size: 10 },
              },
        ]);

        res.json(usersByInterests);
    } catch (error) {
        console.error('Error finding users by interests:', error);
        res.status(500).send('Server Error');
    }
});

module.exports=router;