const express = require('express');
const ProfileModel = require('../../models/profileModel');
const authenticateToken = require('../../middleware/authenticeToken');
const router = express.Router();

router.post('/profile', authenticateToken, async (req, res) => {
  const { dob, bio, age,qualification,interests,drinking,smoking,profileImage,additionalImage1,additionalImage2,additionalImage3,gender,hobbies} = req.body;
  const userId = req.user.userId;

  try {
    let profile = await ProfileModel.findOne({ user: userId });
    const interestsArray = await interests.split(',').map(interest => interest.trim()).filter(interest => interest !== '');
    if (!profile) {
      profile = new ProfileModel({
        user: userId,
        dob,
        bio, 
        age, 
        qualification,
        interests:interestsArray,
        drinking,
        smoking,
        profileImage,
        additionalImage1,
        additionalImage2,
        additionalImage3,
        gender,
        hobbies
      });
    } 

    await profile.save();
    res.status(200).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error: error.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  const { dob, bio, age, qualification, interests, drinking, smoking, profileImage, additionalImage1, additionalImage2,additionalImage3, gender, hobbies } = req.body;
  const userId = req.user.userId;

  try {
    let interestsArray
    if(typeof interests==='string'){
    interestsArray = interests.split(',').map(interest => interest.trim()).filter(interest => interest !== '');
    }
    let profile = await ProfileModel.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.dob = dob || profile.dob;
    profile.bio = bio || profile.bio;
    profile.age = age || profile.age;
    profile.qualification = qualification || profile.qualification;
    profile.interests = interestsArray ? interestsArray : profile.interests;
    profile.drinking = drinking || profile.drinking;
    profile.smoking = smoking || profile.smoking;
    profile.profileImage = profileImage || profile.profileImage;
    profile.additionalImage1 = additionalImage1 || profile.additionalImage1;
    profile.additionalImage2 = additionalImage2 || profile.additionalImage2;
    profile.additionalImage3=additionalImage3 || profile.additionalImage3
    profile.gender = gender || profile.gender;
    profile.hobbies = hobbies || profile.hobbies;

    await profile.save();
    return res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const profile = await ProfileModel.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

router.post('/update-gender-pref',authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { genderPreference } = req.body;
  
  try {
    let profile = await ProfileModel.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.genderPreference = genderPreference;
    profile = await profile.save();
    res.status(200).json({message:"gender preference updated"})
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

