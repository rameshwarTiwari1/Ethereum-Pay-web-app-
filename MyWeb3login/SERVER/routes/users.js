const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

var jwt = require("jsonwebtoken");

var jwtAuth = (req, res, next) => {
  var token = req.headers.authorization;
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECREATKEY, function (err, decoded) {
    if (err) {
      res.send({ message: "Invalid Token" });
    } else {
      next();
    }
  });
};

router.get("/", (req, res) => {
  res.send("hello code.... ");
});

router.get("/list", jwtAuth, userCtrl.userList);

router.post("/add", userCtrl.userAdd);

router.post("/login", userCtrl.userLogin);

router.post("/email-send", userCtrl.emailSend);

router.post("/change-password", userCtrl.changePassword);

module.exports = router;
