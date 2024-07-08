const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true },
    receiver: {
         type: Schema.Types.ObjectId,
         ref: 'users', required: true },
    status: { 
         type: String, 
         enum: ['pending', 'accepted', 'rejected'], 
         default: 'pending' },
    createdAt: { 
         type: Date, 
         default: Date.now 
        },
});

const RequestModel=mongoose.model('Request', requestSchema)
module.exports = RequestModel;