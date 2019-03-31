'use strict'
const Container = require('../model/container');
const {
    ObjectId
} = require('mongodb');
const containerStatus = require('../model/containerstatus');
const containerHistory = require('../model/containerstatushistory');
module.exports.storeContainer = async (req, res, next) => {
    const reqs = req.body;
    const container = new Container();
    let containerstatus = await containerStatus.findOne({
        containerStatus: 'draft'
    });
    try {
        if (containerstatus) {
            // container save
            container.containerName = reqs.containerName;
            container.containerStatus = containerstatus._id;
            try {
                await container.save();

            } catch (error) {
                return res.status(200).send({
                    success: false,
                    message: "container not save",
                    error: error
                })
            }
            // container history data
            let containerhistory = new containerHistory();
            containerhistory.containerId = container._id;
            containerhistory.containerHistory = containerstatus;
            try {
                await containerhistory.save();

            } catch (error) {
                return res.status(200).send({
                    success: false,
                    message: "container not save",
                    error: error
                })
            }
            // end of save history data
            return res.status(200).send({
                success: true,
                container: container
            })
        } else {
            return res.status(200).send({
                success: false,
                message: "container status not found",
                containerStatus: containerstatus
            })
        }
    } catch (error) {}
    return res.status(200).send({
        success: true,
        containerStatus: containerstatus
    })

}

module.exports.updateContainerStatus = async (req, res, next) => {
    let query = req.query;
    const container = await Container.findOne({
        _id: query.containerId
    });
    if (container) {
        container.containerStatus = ObjectId(req.body.StatusId);
        await container.save();
        let containerhistory = await containerHistory.findOne({
            containerId: ObjectId(query.containerId)
        });
        containerhistory.containerHistory.push(ObjectId(req.body.StatusId));
        await containerhistory.save();
        return res.status(200).send({
            success: true,
            container: container
        })
    }
    return res.status(200).send({
        success: false,
        container: "container not found "
    })

}

module.exports.fetchContainer = async (req, res, next) => {
    const container = await Container.findOne({}).
    populate({
            path: 'containerStatus',

        })
        .populate('shipment');


    return res.status(200).send({
        success: true,
        container: container
    })
}