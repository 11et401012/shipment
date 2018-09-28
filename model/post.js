'use strict'
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    comment: {
        type: String,
        require: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
})
const posts = mongoose.model('post', UserSchema);
module.exports = posts;