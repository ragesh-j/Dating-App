const express = require('express');
const router = express.Router();
const authenticateToken=require("../middleware/authenticeToken")
const ProfileModel=require("../models/profileModel")


router.post('/do-not-show', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { profileId } = req.body;
    

    try {
        const profile = await ProfileModel.findOne({user:profileId});
        
        if (!profile) {
            return res.status(404).json({message:'Profile not found'});
        }

        if (!profile.doNotShowFor.includes(userId)) {
            profile.doNotShowFor.push(userId);
            await profile.save();
        }

        res.status(200).json({message:'Profile marked as do not show'});
    } catch (error) {
        console.error('Error updating do not show:', error);
        res.status(500).json({message:'Server Error'});
    }
});
module.exports=router;