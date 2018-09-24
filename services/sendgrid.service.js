'use strict';
const sgMail = require('@sendgrid/mail');
const express = require('express')



exports.sendEmail= async (req,res,next)=>{
sgMail.setApiKey('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');
const msg = {
  to: req.to,
  from:{ email:req.from,name:'Team AviTech'},
  subject: 'email testing',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
 await sgMail.send(msg);
 // return true
}

