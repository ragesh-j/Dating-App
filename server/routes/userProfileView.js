const express = require('express');
const mongoose = require('mongoose');
const ProfileModel = require('../models/profileModel');
const authenticateToken = require('../middleware/authenticeToken');

const router = express.Router();

router.get('/user-detail/:id',authenticateToken, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);

    const userDetail = await ProfileModel.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $lookup: {
          from: 'employements',
          localField: 'user',
          foreignField: 'user',
          as: 'employmentDetails'
        }
      },
      {
        $unwind: {
          path: '$employmentDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          userId: '$userDetails._id',
          first_name: '$userDetails.first_name',
          last_name: '$userDetails.last_name',
          qualification: 1,
          bio: 1,
          dob: 1,
          age:1,
          hobbies: 1,
          interests: 1,
          profileImage: 1,
          additionalImage1: 1,
          additionalImage2: 1,
          additionalImage3: 1,
          genderPreference: 1,
          gender: 1,
          occupation: '$employmentDetails.employement',
          company: '$employmentDetails.companyName',
          designation: '$employmentDetails.designation',
          level: '$employmentDetails.level'
        }
      }
    ]);

    if (!userDetail.length) {
      return res.status(404).send('User not found');
    }

    res.json(userDetail[0]);
  } catch (error) {
    console.error('Error fetching user detail:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;