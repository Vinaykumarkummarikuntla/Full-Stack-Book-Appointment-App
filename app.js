const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const sequelize = require("./util/database");
const User = require("./models/usermodel");

// user details storing in database
app.post("/postuserdetails", (req, res, next) => {
  const username = req.body.name;
  const mail = req.body.email;
  const phonenumber = req.body.phonenumber;

  const data = User.create({
    name: username,
    mail: mail,
    phonenumber: phonenumber,
  });
  res.status(200).json({ newUserDetails: data });
});

// getting the user details from database
app.get("/userdetails", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ UserDetails: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve user details from the database" });
  }
});

// delete user details
app.delete("/userdelete/:id", async (req, res, next) => {
  const delUserId = req.params.id;

  try {
    const user = await User.findByPk(delUserId);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to delete user details from the database" });
  }
});

// edit user details
app.get("/editdetails/:id", async (req, res, next) => {
  const editUserId = req.params.id;
  try {
    const user = await User.findByPk(editUserId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve user details from the database" });
  }
});

// sync with sequelize
sequelize
  .sync()
  .then((result) => {
    console.log(result), app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
