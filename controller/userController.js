'use strict'

const user =require('../model/users');


module.exports.registerUser=async (request,response,next)=>{

    console.log("ok")

    return response.status(200).send({
        success:true,
        message:'successfully register'
    })
}

