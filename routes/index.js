const express = require('express');
const router = express.Router();
const User = require('../model/users');
const authentication=require('../services/auth.service');
const userMiddleware=require('../middleware/register.middleware');
const userController = require('../controller/userController');
const TasktodoController=require('../controller/TaskTodoController');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'

  });
});

router.post('/user', userMiddleware.ValidateReg, userController.registerUser)
  .delete('/user', authentication.auth, userController.userdelete)
  .post('/user/post', authentication.auth, userController.post)
  .post('/user/login',userMiddleware.validateLogin, userController.userlogin)
  .get('/user', authentication.auth, userController.getUerDetails)
  .post('/user/task',authentication.auth,TasktodoController.storeTask)
  .get('/user/task',authentication.auth,TasktodoController.fetchtask);
  

const sendEmail = require('../services/sendgrid.service')
router.get('/email', async (req, res, next) => {
  let email = {
    to: 'avinashpateljnu@gmail.com',
    from: 'avinash@eventizy.in'
  }
  const sent = await sendEmail.sendEmail(email)
  res.json({
    success: true,
    sent: sent,
    sendEmail: sendEmail
  })
})
module.exports = router;