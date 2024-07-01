const mongoose=require('mongoose')

const Schema=mongoose.Schema

const employementSchema=new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    companyName:{
        type:String
    },
    designation:{
        type:String
    },
    employement:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    level:{
        type:String
    }
})

const employementModel=mongoose.model('Employements',employementSchema)
module.exports=employementModel