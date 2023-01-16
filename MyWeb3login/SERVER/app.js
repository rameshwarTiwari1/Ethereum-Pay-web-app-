const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port} `);
});
