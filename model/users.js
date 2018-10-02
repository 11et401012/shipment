'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const mongoose_delete = require('mongoose-delete');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})
UserSchema.plugin(mongoose_delete, {
    deletedAt: true
});
UserSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

function done(isMatch){
    return 
}
UserSchema.methods.comparePassword = function (candidatePassword,next){
    console.log("cb",candidatePassword)
     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) done(err)
       done(null, isMatch);
      console.log(isMatch)
    //  return isMatch;
    next()

    });
}
const users = mongoose.model('users', UserSchema);
module.exports = users;