const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const sequelize = require("./util/database");

// app.use(adminRoutes);

const User = require("./models/usermodel");

app.post("/postuserdetails", (req, res, next) => {
  const username = req.body.name;
  const mail = req.body.email;
  const phonenumber = req.body.phonenumber;

  console.log(username, mail, phonenumber);

  const data = User.create({
    name: username,
    mail: mail,
    phonenumber: phonenumber,
  });
  res.status(200).json({ newUserDetails: data });
});

sequelize
  .sync()
  .then((result) => {
    console.log(result), app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
