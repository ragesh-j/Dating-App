const mongoose=require('mongoose')

const Schema=mongoose.Schema

const locationSchema=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      location:{
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
      }
})
locationSchema.index({ location: '2dsphere' })
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;