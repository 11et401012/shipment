'use strict'
const express = require('express');
const User = require('../model/users');
const initDb = require("../dbconnection/db").initDb;
const getDb = require("../dbconnection/db").getDb;
// mongod --storageEngine=mmapv1 --dbpath ./bata/db
module.exports.registerUser = async (request, response, next) => {
    const user = new User()
    user.username = request.body.username;
    user.password = request.body.password;
    user.email = request.body.email;
    user.name = request.body.name;
    await user.save();
    if (user) {
        return response.status(200).send({
            success: true,
            user: user,
            message: 'successfully register'
        })
    }
}