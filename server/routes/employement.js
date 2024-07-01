const express=require('express')
const employementModel=require("../models/employementModel")
const router=express.Router()
const authenticateToken=require("../middleware/authenticeToken")
router.post('/employement', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const data = req.body;
  
    try {
      let employed = await employementModel.findOne({ user: userId });
  
      if (data.employement === 'Employee/Employer') {
        const { companyName, designation, location, employement } = data;
        if (!employed) {
          employed = new employementModel({
            user: userId,
            employement,
            companyName,
            designation,
            location,
          });
        } else {
          employed.employement = employement;
          employed.companyName = companyName;
          employed.designation = designation;
          employed.location = location;
          employed.level=undefined
        }
      } else if (data.employement === 'Job seeker') {
        const { level, employement } = data;
        if (!employed) {
          employed = new employementModel({
            user: userId,
            employement,
            level,
          });
        } else {
          employed.employement = employement;
          employed.level = level;
          employed.companyName=undefined
          employed.location=undefined
          employed.designation=undefined
        }
      }
  
    
      await employed.save();
  
      
      res.status(200).json({ message: 'Employment data saved successfully', data: employed });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;