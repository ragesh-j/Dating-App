const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        
    },
    last_name:{
        type:String,
        
    },
    email: {
        type: String,
        
    },
    contact: {
        type: Number,
        
    },
    password: {
        type: String,
       
    },
    googleId: {
        type: String,
       
      },
      name: {
        type: String,
        
      },
    registration_date:{
        type:Date
    }
}, { timestamps: true });

const UserModel=mongoose.model('users',userSchema);

module.exports=UserModel;