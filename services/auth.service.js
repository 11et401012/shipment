'use strict'
const jwt = require('jsonwebtoken');
module.exports.auth=async (req,res,next)=>{
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader !=='undefined'){
     const bearer=bearerHeader.split(' ');
     const bearerToken=bearer[1];
     const authData=await jwt.verify(bearerToken,'secretkey')
     if(authData){
          req.authData=authData;
          next()
     }else{
     return res.status(403).send({
         success:false,
         message:"autherization failed"
     })
    }
    }else
    {
        return res.status(403).send({
            success:false,
            message:"autherization failed"
        })
    }
}

