const express = require('express');
const router = express.Router();
const User = require('../model/users');
const userController = require('../controller/userController');
/* GET home page. */
function verifytoken(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/user', userController.registerUser)
  .delete('/user/:id', verifytoken, userController.userdelete)
  .post('/user/post', userController.post)
  .get('/user/:id', userController.getUerDetails)

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