const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendResetMobilePasswordEmail = function (props) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_PROVIDER,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // paste network key in the href line but only until :3000!!
    const message = {
      from: process.env.MAIL_USERNAME,
      to: props.email,
      subject: "Digital Guide - Change Password",
      html: `
        <h3> Hello ${props.username}, </h3>
        <p>Here is your password reset link</p>                            
        <p>Please click on this link to reset your password: <a target="_" href="http://192.168.0.2:3000/newmpassword/${props.id}">http://192.168.0.5:3000/newmpassword/${props.id} </a></p> 
        <p>Best regards</p>
        <p>Your Digital Guide Team</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};

exports.sendResetPasswordEmail = function (props) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_PROVIDER,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.MAIL_USERNAME,
      to: props.email,
      subject: "Digital Guide - Change Password",
      html: `
        <h3> Hello ${props.username}, </h3>
        <p>Here is your password reset link</p>
        <p>Please click on this link to reset your password: <a target="_" href="http://localhost:3000/newpassword/${props.id}">http://localhost:3000/newpassword/${props.id} </a></p>
        <p>Best regards</p>
        <p>Your Digital Guide Team</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};
