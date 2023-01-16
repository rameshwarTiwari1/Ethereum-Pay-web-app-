const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb://localhost:${process.env.DBPORT}/${process.env.DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((conn) => {
    console.log("connected DB");
  })
  .catch((err) => {
    console.log("error", err);
  });

module.exports = mongoose;
