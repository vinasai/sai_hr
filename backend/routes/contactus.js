const express = require('express');
const router = express.Router()
const nodemailer = require('nodemailer');

router.route('/').post((req,res)=>{
    const { name, email, number, message } = req.body;

    require('dotenv').config();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EAMIL_PASS
        }
      });

      var mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO_USER,
        subject: `Sai HR - Contact Request from ${name}`,
        html: `<h1>Sai HR - Contact Request</h1>
               <p>Hello,</p>
               <p>You have received a new contact request.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone Number:</strong> ${number}</p>
               <p><strong>Message:</strong> ${message}</p>
               <p>Best Regards,</p>
               <p><strong>${name}</strong></p>`
    };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error', message: 'Email not sent' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ status: 'success', message: 'Email sent successfully' });
        }
      });
})
module.exports = router