const DB = "mongodb://localhost/apusmanfoundation";
const {Admin} = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// connecting to MongoDB with
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY:::`);
  })
  .catch((err) => {
    console.log(err);
  });

const admin = new Admin({
  username: "Debeyo",
  email: "debby@gmail.com",
  password: "1234",
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) {
      throw err;
    }
    admin.password = hash;
    console.log(admin)
    admin
      .save()
      .then(() => {
        console.log("admin save successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
