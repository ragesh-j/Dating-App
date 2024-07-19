const express = require('express');
const mongoose = require('mongoose');
const ItemModel = require('../../models/ecommerce/itemModel');
const CartModel = require('../../models/ecommerce/cartModel');
const authenticateToken = require('../../middleware/authenticeToken');

const router = express.Router();

// Add item to cart
router.post('/add-to-cart',authenticateToken, async (req, res) => {
    const userId=req.user.userId
    const { itemId } = req.body;
    console.log(req.body)
  try {
    const item = await ItemModel.findOne({_id:itemId});
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    let cart = await CartModel.findOne({ userId, status: 'active' });
    if (!cart) {
      cart =  new CartModel({
        userId,
        items: [],
        totalPrice: 0,
        status: 'active'
      });
    }
    const cartItem =  cart.items.find(i => i.itemId.toString() === itemId);
    if (cartItem) {
      return res.status(400).json({ message: 'Item already in cart' });
    } else {
      cart.items.push({ itemId, quantity: 1, price: item.price });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/update-cart-item',authenticateToken, async (req, res) => {
  const userId=req.user.userId
  
  try {
    const { itemId, quantity } = req.body;
    const cart = await CartModel.findOne({ userId, status: 'active' }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.items.find(i => i.itemId._id.toString() === itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/get-cart',authenticateToken, async (req, res) => {
  const userId=req.user.userId  
  try {
    
    const cart = await CartModel.findOne({ userId, status: 'active' }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;