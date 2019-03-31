'use strict'
const Container = require('../model/container');

module.exports.findContainer = async (req, res, next) => {
    const container = await Container.findOne({
        _id: req.body.containerId
    }).populate({
        path: 'containerStatus',
        match: {
            containerStatus: 'draft'
        }
    });
    if (container) {
        if (container.containerStatus) {
            let shipWeight = req.body.shipWeight + container.containerWeightfilled;
            let shipValume = req.body.shipValume + container.containerVolumefilled;
            req.body.containerWeightfilled = shipWeight;
            req.body.containerVolumefilled = shipValume;
            if (shipWeight <= container.containerWeight && shipValume <= container.containerVolume) {
                next()
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'container volume or weight are greater than defalut value'
                })
            }

        } else {
            return res.status(400).send({
                success: false,
                message: 'container is  ongoing'
            })
        }
    } else {
        return res.status(400).send({
            success: false,
            message: 'container not found'
        })
    }
}