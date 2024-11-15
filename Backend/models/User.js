const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    PhoneNo: {
        type: String,
        required: true,
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
    City:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.Now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    otp: { 
        type: String,
        default: null,
      },
    otpExpiration: { 
    type: Date,
    default: null,
    }
});
const User = mongoose.model('User',UserSchema);
// User.createIndexes();
module.exports= User