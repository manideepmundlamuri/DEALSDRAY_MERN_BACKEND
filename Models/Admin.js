const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     user:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
      }
     ]
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports=Admin