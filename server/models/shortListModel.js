const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortListSchema = new Schema({
    shortListedBy: { 
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true 
    },
    shortListed: {
         type: Schema.Types.ObjectId,
         ref: 'users',
        required: true 
        },
    createdAt: { 
         type: Date, 
         default: Date.now 
        },
});

const shortListModel=mongoose.model('Shortlist', shortListSchema)
module.exports = shortListModel;