const mongoose = require("mongoose");
const connection = require("../config/db");

var otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);
let otp=connection.model('otp',otpSchema,'otp')

module.exports=otp;