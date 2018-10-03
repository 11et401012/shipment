'use strict'
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    due_date:{type:Date},
    task_status:{type:Number,default:1},
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },

    todos:[ {
        type: mongoose.Schema.ObjectId,
        ref: 'todos'
    }]
    
})
TaskSchema.plugin(mongoose_delete, {
    deletedAt: true
});
const Task = mongoose.model('task', TaskSchema);
module.exports = Task;