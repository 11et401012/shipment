'use strict'
const mongoose = require('mongoose');
const ShipmentSchema = mongoose.Schema({
    shipWeight: {
        type: Number,
        require: true,
        trim: true
    },
    shipValume: {
        type: Number,
        require: true,
        trim: true,
    },
    shipName: {
        type: String,
        require: true,
        trim: true,
    },
    Container: {
        type: mongoose.Schema.ObjectId,
        ref: 'container'
    }
})
const shipments = mongoose.model('shipment', ShipmentSchema);
module.exports = shipments;