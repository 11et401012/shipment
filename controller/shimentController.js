'use strict'
const Shipment = require('../model/shipment');
const Container = require('../model/container');
const {
    ObjectId
} = require('mongodb');

module.exports.storeShipment = async (req, res, next) => {
    const reqs = req.body;
    const container = await Container.findOne({
        _id: req.body.containerId
    });
    const shipment = new Shipment();
    shipment.shipWeight = reqs.shipWeight;
    shipment.shipValume = reqs.shipValume;
    shipment.shipName = reqs.shipName;
    shipment.Container = ObjectId(reqs.containerId);
    try {
        await shipment.save()
        container.containerWeightfilled = reqs.containerWeightfilled;
        container.containerVolumefilled = reqs.containerVolumefilled;
        container.shipment.push(shipment)
        await container.save();
        return res.status(200).send({
            success: true,
            shipment: shipment,
        })
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: "container not save",
            error: error
        })
    }
    // container history data

}

module.exports.deleteShipment = async (req, res, next) => {
    const reqs = req.body;
    let query = req.query;

    if (typeof query.shipmentId == 'undefined') {
        return res.status(400).send({
            success: false,
            message: "params  data  not  found"
        })
    }
    const shipment = await Shipment.findOne({
        _id: query.shipmentId
    });
    if (shipment) {
        const container = await Container.findOne({
            _id: shipment.Container
        }).populate({
            path: 'containerStatus',
            match: {
                containerStatus: 'draft'
            }
        })
        if (container.containerStatus) {
            await shipment.delete();
            container.containerWeightfilled = container.containerWeightfilled - shipment.shipWeight;
            container.containerVolumefilled = container.containerVolumefilled - shipment.shipValume;
            await container.save();
            return res.status(200).send({
                success: true,
                shipment: shipment
            })
        } else {
            return res.status(200).send({
                success: false,
                error: "container is in progress or completed"
            })
        }
    }
    return res.status(400).send({
        success: false,
        message: "shipment   data  not  found"
    })

    // const shipment = new Shipment();
}
module.exports.fetchShipment = async (req, res, next) => {
    const shipment = await Shipment.find({})
        .populate('Container');

    return res.status(200).send({
        success: true,
        shipment: shipment
    })
}