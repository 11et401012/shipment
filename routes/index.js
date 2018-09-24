const express = require('express');
const router = express.Router();
const userController =require('../controller/userController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router
.route('/user')
 .get(userController.registerUser);

const sendEmail=require('../services/sendgrid.service')
router.get('/email', async(req, res,next)=> { 
  let email={
    to:'avinashpateljnu@gmail.com',
    from:'avinash@eventizy.in'
  }
   const sent= await sendEmail.sendEmail(email)
  console.log("sendEmail",sent)
res.json({success:true,sendEmail:sendEmail})
})
module.exports = router;
