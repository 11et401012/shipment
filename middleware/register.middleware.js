'use strict'

module.exports.validateLogin=async(req,res,next)=>{
    req.checkBody('username',"please enter username").notEmpty()
    req.checkBody('password',"password is required").notEmpty()
   let error=req.validationErrors();
   if(error){
       return res.status(200).send({
           success:false,
           message:error
       })
   }else{
       next()
   }

}