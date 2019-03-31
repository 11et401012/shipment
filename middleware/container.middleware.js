'use strict'
const {
    check,
    validationResult
} = require('express-validator/check');

module.exports.ValidateContainer = async (req, res, next) => {
    req.check('containerName', "containe rName is required").trim().notEmpty()
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