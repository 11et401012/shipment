'use strict'
const express = require('express');
const User = require('../model/users');
const Post = require('../model/post');

const jwt = require('jsonwebtoken');
const initDb = require("../dbconnection/db").initDb;
const getDb = require("../dbconnection/db").getDb;
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
            //token: token,
            message: 'successfully register'
        })
    }
}
module.exports.userdelete = (async (req, res, next) => {
    const user = await User.findOne({
        username: req.params.id
    })
    if (User) {
        const deleteuser = await User.delete()
        return res.status(200).send({
            success: true,
            user: user
        })
    }
})

//5bae680f596d7d1b94b38256

module.exports.post = (async (req, res, next) => {
    const post = new Post();
    post.comment = req.body.comment;
    // post.user_id = req.body.user_id;
    //await post.save();
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
   // console.log(req.params)
   let {id,page}=req.query;
   console.log("req", id)

    let perpage=1;
    const user = await User.findById(id)
        .populate('post')
    return res.status(200).send({
        success: true,
        user: user
    })

})