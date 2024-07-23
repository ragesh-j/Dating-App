const express = require('express');
const router = express.Router();
const AddressModel = require('../../models/ecommerce/addressModel');
const authenticateToken = require('../../middleware/authenticeToken');



router.get('/addresses', authenticateToken, async (req, res) => {
  try {
    const addresses = await AddressModel.find({ userId: req.user.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/addresses', authenticateToken, async (req, res) => {
  const { name, address, phone,pinCode } = req.body;
  
  try {
    const newAddress = new AddressModel({
      userId: req.user.userId,
      name,
      address,
      phone,
      pinCode
    });
    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;