'use strict'
const {
    check,
    body,
    validationResult
} = require('express-validator/check');

module.exports.ValidateContainerStatus = async (req, res, next) => {

    req.check('containerStatus', "container Status is required").notEmpty()
    req.check('containerStatus', "container Status is allready").exists()
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