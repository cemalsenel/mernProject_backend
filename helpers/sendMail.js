const { json } = require('express');
const nodemailer = require('nodemailer');

/**
  *@param {(String)} to - Reciever's e-mail.
  *@param {(String)} subject - Topic
  *@param {(String)} format - Which format do you send your e-mail? Text or html.
  *@param {(String)} message - Your message
*/
const sendMail = function (to, subject, format, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }

    });

    const textFormat = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: message,
    };

    const htmlFormat = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: message,
    };

    let mailOptions = format === 'text' ? textFormat : htmlFormat;
    console.log("Burdayiiim");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + JSON.stringify(info));
        }
    });
}

module.exports = sendMail;
