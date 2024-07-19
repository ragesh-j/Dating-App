const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } // This will be the price for the quantity
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' }
});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;