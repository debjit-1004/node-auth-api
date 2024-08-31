const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    pasword: {
        type:String,
        required:true
    },
    role: {
        type:Number,
        default: 0 //   0:normal user 1: admin 2: sub-admin 3: editor
    }
})



module.exports  = mongoose.model('User', userSchema)