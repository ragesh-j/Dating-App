const express=require('express')
const Razorpay=require('razorpay')
const shortid=require('shortid');
const authenticateToken = require('../../middleware/authenticeToken');
const router=express.Router()

const razorpay = new Razorpay({
    key_id: 'rzp_test_nJTJIRuTTgGOpq',
    key_secret: 'PSlQ4xxuISUB6xYCgXQEJgjz',
  });
router.post('/razorpay',authenticateToken, async(req,res)=>{
    const{amount}=req.body
	const payment_capture = 1
	
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})
module.exports=router