'use strict'
const mongoose = require('mongoose');
const ContainerStatusHistorySchema = mongoose.Schema({
    containerId: {
        type: String,
        require: true,
    },
    containerHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'container'
    }]
})
const containerstatushistory = mongoose.model('containerstatushistory', ContainerStatusHistorySchema);
module.exports = containerstatushistory;