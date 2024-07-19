const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
});
const ItemModel= mongoose.model('item', itemSchema);

module.exports =ItemModel