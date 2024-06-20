const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const express=require('express')
const router=express.Router()
const UserModel=require("../models/UserModel")
const client=require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_VERIFY_AUTH)
let saltVal=10
let tempData=new Map()
router.post('/registration',async(req,res)=>{
    const {first_name,last_name,contact,email,password}=req.body;   
    try{
        let existingUser=await UserModel.findOne({contact})
        if (existingUser){
            return res.status(400).json({message:"User already exist with this number."})
        }
       
        client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
      .verifications
      .create({ to: contact, channel: 'sms' })
      .then(async verification => {
        if (verification.status === 'pending') {
            tempData.set(contact,{first_name,last_name,email,contact,password:await bcrypt.hash(password,saltVal)})
            
          res.status(200).json({ message: 'OTP sent to phone number' });
        } else {
          res.status(500).json({ message: 'Error sending OTP' });
        }}).catch(error => {
            res.status(500).json({ message: 'Error sending OTP', error: error.message });
          });
    }
    catch(err){
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }

})
router.post('/registration/verify', async (req, res) => {
    const { otp } = req.body;

    try {
        let contact;
        for (let key of tempData.keys()) {
            contact = key;
            break;
        }

        if (!contact) {
            return res.status(400).json({ message: 'No pending registration found' });
        }
        client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: contact, code: otp })
            .then(async verification_check => {
                if (verification_check.status === 'approved') {
                    const userData = tempData.get(contact);
                    if (!userData) {
                        return res.status(400).json({ message: 'No pending registration data found' });
                    }
                    const{first_name,last_name,email,password}=userData
                    const newUser = new UserModel({
                        first_name,
                        last_name,
                        email,
                        contact,password
                    });
                    await newUser.save();
                    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    tempData.delete(contact);
                    res.status(201).json({ message: 'User registered successfully' ,token});
                } else {
                    res.status(400).json({ message: 'Invalid OTP' });
                }
            }).catch(error => {
                res.status(500).json({ message: 'Error verifying OTP', error: error.message });
            });

    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Error verifying OTP', error: err.message });
    }
});
  module.exports=router;