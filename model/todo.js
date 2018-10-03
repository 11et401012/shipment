'use strict'
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    status:{type:Number,default:1},
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
})
TodoSchema.plugin(mongoose_delete, {
    deletedAt: true
});
const todo = mongoose.model('todo', TodoSchema);
module.exports = todo;