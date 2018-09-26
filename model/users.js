'use strict'
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String},
    name:{type:String,required:true},
    email:{type:String,required:true}
})

const users=mongoose.model('users',userSchema);
module.exports=users;