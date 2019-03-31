'use strict'
const mongoose = require('mongoose');
const ContainerStatusSchema = mongoose.Schema({
    containerStatus: {
        type: String,
        require: true,
        unique: true
    },
})
const containerstatus = mongoose.model('containerstatus', ContainerStatusSchema);
module.exports = containerstatus;