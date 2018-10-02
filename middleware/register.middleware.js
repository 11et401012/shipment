'use strict'
const {
    check,
    validationResult
} = require('express-validator/check');
module.exports.validateLogin = async (req, res, next) => {
    req.checkBody('username', "please enter username").notEmpty()
    req.checkBody('password', "password is required").notEmpty()
    let error = req.validationErrors();
    if (error) {
        return res.status(200).send({
            success: false,
            message: error
        })
    } else {
        next()
    }

}
module.exports.ValidateReg = async (req, res, next) => {
    req.check('username', "username is required").notEmpty()
    req.check('username', "username is required").exists()
    req.check('password', "password is required").notEmpty()
    req.check('email', 'email is required').notEmpty()
    req.check('email', "email currect formate").isEmail()
    req.check('passwordConfirmation', "confirmation  password is required").notEmpty()
    req.check('passwordConfirmation', "missmatch password").equals(req.body.password);
    let error = req.validationErrors();
    if (error) {
        return res.status(200).send({
            success: false,
            message: error
        })
    } else {
        next()
    }
}