var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
