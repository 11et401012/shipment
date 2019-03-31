'use strict'
const {
    check,
    validationResult
} = require('express-validator/check');

module.exports.Validateshipment = async (req, res, next) => {
    req.check('shipName', "shipName  is required").trim().notEmpty()
    req.check('shipValume', "shipValume  is required").trim().notEmpty()
    req.check('shipWeight', "shipWeight is required").trim().notEmpty()
    req.check('containerId', "Container  is required").trim().notEmpty()
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