const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    designation: {
        type: [
            {
                type: String,
                enum: ['hr', 'manager', 'sales']
            }
        ]
    },
    gender:{
        type:[
            {
                type:String,
                enum:['male','female']
            }
        ]
    },
    course:{
        type:[
            {
                type:String,
                enum:['mca','bca','bsc']
            }
        ]
    },
    image:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin"
        }
    ]
})

const User = mongoose.model('user',userSchema);

module.exports=User;