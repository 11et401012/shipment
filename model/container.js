'use strict'
const mongoose = require('mongoose');
const ContainerSchema = mongoose.Schema({
    containerWeight: {
        type: Number,
        require: true,
        trim: true,
        default: 25000000
    },
    containerName: {
        type: String,
        require: true,
        trim: true,
    },
    containerVolume: {
        type: Number,
        require: true,
        default: 3000
    },
    containerVolumefilled: {
        type: Number,
        require: true,
        default: 0
    },
    containerWeightfilled: {
        type: Number,
        require: true,
        default: 0
    },
    containerStatus: {
        type: mongoose.Schema.ObjectId,
        ref: 'containerstatus'
    },
    shipment: [{
        type: mongoose.Schema.ObjectId,
        ref: 'shipment'
    }]
})
const containers = mongoose.model('container', ContainerSchema);
module.exports = containers;