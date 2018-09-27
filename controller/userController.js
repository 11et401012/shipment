'use strict'
const express = require('express');
const User = require('../model/users');
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
    const token = jwt.sign({
        user: s
    }, request.app.get('secretKey'), {
        expiresIn: '1h'
    });
    if (s) {
        return response.status(200).send({
            success: true,
            user: s,
            token: token,
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