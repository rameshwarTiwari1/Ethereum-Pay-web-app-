const Users = require("../models/users");
var bcrypt = require("bcryptjs");
const { response } = require("express");
const Otp = require("../models/otp");
var nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const userList = async (req, resp) => {
  let data = await Users.find();
  resp.json(data);
};

//user add
const userAdd = async (req, resp) => {
  let { name, email, password } = req.body;
  let data = new Users({ name, email, password });
  var mail = req.body.email;
  let data1 = await Users.findOne({ email: req.body.email });
  if (data1) {
    console.log("mail already exist you can not add");
    resp.status(409).json({ message: "email-id already exist" });
  } else {
    let response = await data.save();
    let myToken = await data.getAuthToken();
    resp.status(200).json({ message: "success", token: myToken });
  }
};

//Login
const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res
      .status(301)
      .json({ message: "Error", message: "please select email/password" });
  }
  let user = await Users.findOne({ email: req.body.email });
  var responseType = {
    message: "ok",
  };
  if (user) {
    // var match = await bcrypt.compare(req.body.password, user.password);
    var match = await (req.body.password == user.password);

    if (match) {
      let myToken = await user.getAuthToken();

      responseType.message = "Login Successfully";
      responseType.token = myToken;
    } else {
      responseType.message = "Invalid Password";
    }
  } else {
    responseType.message = "Invalid Email ID";
  }
  console.log(user);
  res.status(200).json({ data: responseType });
};

// for otp
const emailSend = async (req, res) => {
  // console.log("hiiemail",req.body.email);
  var mail = req.body.email;
  let data = await Users.findOne({ email: req.body.email });
  console.log("yes data find", data);
  const responseType = {};
  if (data) {
    var otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    console.log("Hello OTPRESPONSE", otpcode);
    let otpCode = req.body.otpcode;
    //npx nodemon app.js for running this project
    // mail function calling
    mailer(mail, otpcode);

    responseType.statusText = "success";
    responseType.message = "Please check Your Email!";
  } else {
    responseType.statusText = "error";
    responseType.message = "Email Id not Exist";
  }
  res.status(200).json(responseType);
};

//change password
const changePassword = async (req, res) => {
  let data = await Otp.find({ email: req.body.email, code: req.body.otpcode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let difference = data.expireIn - currentTime;
    if (difference < 0) {
      response.message = "Token Expire";
      response.statusText = "error";
    } else {
      let user = await Users.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      response.message = "Password changed Successfully";
      response.statusText = "Success";
    }
  } else {
    response.message = "Invalid Otp";
    response.statusText = "error";
  }
  res.status(200).json(response);
};

////////////////////////// otp on mail send//////////////////
const mailer = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  var mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: process.env.TEXT_SUBJECT,
    text: process.env.TEXT_MESSAGE,
    html: ` <p>This is otp code ${otp}  </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// all module exports here//////////////////
module.exports = {
  userList,
  userAdd,
  userLogin,
  emailSend,
  changePassword,
  mailer,
};
