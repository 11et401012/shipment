'use strict'
const User = require('../model/users');
const Post = require('../model/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// bin\\//  mongod --storageEngine=mmapv1 --dbpath .\data\db
module.exports.registerUser = async (request, response, next) => {
    const user = new User()
    user.username = request.body.username;
    user.password = request.body.password;
    user.email = request.body.email;
    user.name = request.body.name;
    const s = await user.save();
    if (s) {
        return response.status(200).send({
            success: true,
            user: s,
            message: 'successfully register'
        })
    }
}

module.exports.userlogin=(async(req,res,next)=>{
    const reqs=req.body;
   const user=await  User.findOne({username:req.body.username});
   if(user){
      const isMatch=await user.comparePassword(reqs.password) 
     if(isMatch){
      const JwtAuth=await jwt.sign({user:user},'secretkey');
         return res.status(200).send({
             success:true,
             jwt:JwtAuth

         })
        }
     return res.status(200).send({
         success:false,
         message:'password not found'
     })
}
   return res.status(200).send({
       success:false,
       message:'username not found',
       user:user
   })

})
module.exports.userdelete = (async (req, res, next) => {
    const user = await User.findOne({
        username: req.query.id
    })
    if (user) {
        const deleteuser = await user.delete()
        return res.status(200).send({
            success: true,
            user: deleteuser
        })
    }
})

//5bae680f596d7d1b94b38256

module.exports.post = (async (req, res, next) => {
    const post = new Post();
    post.comment = req.body.comment;
    const user = await User.findById(req.body.user_id)
    post.user_id = user;
    await post.save();
    user.post.push(post);
    await user.save();
    if (post) {
        return res.status(200).send({
            success: true,
            post: post
        })
    }
})

module.exports.getUerDetails = (async (req, res, next) => {
   let {id,page}=req.query;
    let perpage=1;
    const user = await User.findById(id)
        .populate('post')
    return res.status(200).send({
        success: true,
          user: user
    })

})