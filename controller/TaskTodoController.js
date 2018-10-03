'use strict'
const Task=require('../model/task');
const Todo=require('../model/todo');

module.exports.storeTask=async(req,res,next)=>{
   const reqs=req.body;
    const user =req.authData;
    const task=new Task();
    task.name=reqs.name;
    task.user_id=user.user._id;
   const tasksave=  await task.save();
    if(tasksave){
        return res.status(200).send({
            success:true,
            task:tasksave
        })
    }
}
module.exports.fetchtask=async(req,res)=>{
    const user=req.authData.user;
    const task=await Task.find({user_id:user._id}).populate('user_id',{name:1})
    return res.status(200).send({
        success:true,
        task:task
    })
}


module.exports.storeTodo=async (req,res)=>{
    const user=req.authData.user;
    const todo=new Todo();
    todo.name=req.body.name;
    
}