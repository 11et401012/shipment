'use strict'
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String},
    name:{type:String,required:true,lowercase:true},
    email:{type:String,required:true}
})

const usermodel=mongoose.model('users',userSchema);
module.exports=usermodel;