
const express = require('express');
const router = express.Router();
const ItemModel=require('../../models/ecommerce/itemModel')
const CategoryModel=require('../../models/ecommerce/categoryModel')

router.post('/items', async (req, res) => {
  const { name, image, categoryId,description,price } = req.body;

  try {
    const category = await CategoryModel.find({categoryId});
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const newItem = new ItemModel({ name, image, categoryId,description,price });
    const savedItem = await newItem.save();
    res.status(201).json({ message:'Item saved successfully', item: savedItem });
  } catch (error) {
    res.status(500).json({ message:'Internal Server error', message: error.message });
  }
});


router.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const items = await ItemModel.find({ _id:id });
    res.status(200).json( items[0] );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

