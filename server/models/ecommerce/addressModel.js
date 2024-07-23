const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pinCode:{
    type:String,
    required:true
  }
});
const AddressModel=mongoose.model('Address', addressSchema);
module.exports = AddressModel