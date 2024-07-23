const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const OrderModel = require('../../models/ecommerce/orderModel');
const CartModel = require('../../models/ecommerce/cartModel');
const authenticateToken = require('../../middleware/authenticeToken');

router.post('/place-order',authenticateToken, async (req, res) => {
  const {  items, addressId, paymentMethod, totalPrice, cartId } = req.body;
  
  try {
    const order = new OrderModel({
      userId:req.user.userId,
      items,
      addressId,
      paymentMethod,
      totalPrice
    });
    await order.save();
    
    if (cartId) {
      await CartModel.findByIdAndUpdate(cartId, { status: 'completed' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/order-placed/:orderId',authenticateToken,async(req,res)=>{
  const {orderId}=req.params
  try{
    const order=await OrderModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addressId',
          foreignField: '_id',
          as: 'addressDetails',
        },
      },
      { $unwind: '$addressDetails' },
      {
        $project: {
          _id: 1,
          userId: 1,
          items: 1,
          totalPrice: 1,
          status: 1,
          paymentMethod: 1,
          placedAt:1,
          addressDetails: 1,
        },
      },
    ])

    res.status(200).json(order)
  }catch(err){
    console.log(err)
  }

})

module.exports = router;