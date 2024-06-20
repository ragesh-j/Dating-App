const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const express=require('express')
const router=express.Router()
const passport = require('passport');
const UserModel=require("../models/UserModel")


router.post("/signin",async (req,res)=>{
    const{contact,password}=req.body;
    try{
        const user= await UserModel.findOne({contact})
        if(!user){
            return res.status(400).json({message:"User not exist. Register as new user to continue"})
        }
        const matchPassword=await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(400).json({message:"Invalid password"})
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({message:'Sign-in successful',token})
    }
    catch(err){
        res.status(500).json({ message: 'Error signing in', error: err.message });
    }
})

module.exports=router