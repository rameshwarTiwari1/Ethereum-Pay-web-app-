const mongoose = require("mongoose");
const connection = require("../config/db");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      select: true,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  // var salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    // this.password = bcrypt.hashSync(this.password, salt);
    this.password = (this.password);

  }
  console.log(this.password);
  next();
});

userSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this._id,
    email: this.email,
  };
  var tokenValue = jwt.sign(params, process.env.SECREATKEY,{expiresIn:'300000s'});
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};

let users = connection.model("users", userSchema);

module.exports = users;
