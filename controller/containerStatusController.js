'use strict'
const containerStatus = require('../model/containerstatus');

module.exports.fetchContainerStatus = async (req, res) => {
    const containerstatus = await containerStatus.find({});
    try {
        return res.status(200).send({
            success: true,
            containerstatus: containerstatus
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "can cot found container status data",
            error: error
        })
    }

}

module.exports.saveContainerStatus = async (req, res) => {
    let reqs = req.body;
    const containerstatus = await containerStatus.findOne({
        containerStatus: reqs.containerStatus
    });
    if (containerstatus) {
        return res.status(400).send({
            success: false,
            message: "found container status data",
            containerstatus: containerstatus
        })
    } else {
        let status = new containerStatus()
        status.containerStatus = reqs.containerStatus;
        try {
            status.save();
            return res.status(200).send({
                success: true,
                containerstatus: status
            })
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "can cot found container status data",
                error: error
            })
        }
    }
}
//db.containerstatus.find