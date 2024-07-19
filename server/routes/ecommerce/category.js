const mongoose=require('mongoose')
const router=require('express').Router()
const CategoryModel=require('../../models/ecommerce/categoryModel')
router.post('/categories', async (req, res) => {
    const { name } = req.body;
  
    try {
      const existingCategory = await CategoryModel.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      const newCategory = new CategoryModel({ name });
      const savedCategory = await newCategory.save();
      res.status(200).json({ message:'Saved succesfully',category: savedCategory });
    } catch (error) {
      res.status(500).json({  message: error.message });
    }
  });


  router.get('/categories-with-items',async(req,res)=>{
    try {
      const categoriesWithItems = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'items', 
            localField: '_id', 
            foreignField: 'categoryId', 
            as: 'items' 
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            items: {
              $map: {
                input: '$items',
                as: 'item',
                in: {
                  id: '$$item._id',
                  name: '$$item.name',
                  image: '$$item.image',
                  price: '$$item.price',
                  description: '$$item.description'
                }
              }
            }
          }
        },
        
      ]);
  
      return res.status(200).json(categoriesWithItems)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' })
      }
  
  })
  
  module.exports=router