'use strict'
const {
    check,
    body,
    validationResult
} = require('express-validator/check');

module.exports.ValidateContainerUpdateStatus = async (req, res, next) => {
    req.check('StatusId', "container Status is required").trim().notEmpty()
    try {
        let error = req.validationErrors();
        console.log(error)
        if (error) {
            return res.status(200).send({
                success: false,
                message: error
            })
        } else {
            next()
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: error
        })
    }
}