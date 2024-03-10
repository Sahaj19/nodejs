const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const port = 3000;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(mongodb connection)
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice");
    console.log("practice database connected successfully!");
  } catch (error) {
    console.log("practice database failed to connect", error);
  }
}

main();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(middlewares)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/users", async (req, res) => {
  let all_users = await User.find({});
  res.render("users/index.ejs", { all_users });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.get("/users/new", (req, res) => {
  res.render("users/new.ejs");
});

//(post route)
app.post("/users", async (req, res) => {
  try {
    let { name, age, gender } = req.body;
    let newUser = new User({ name, age, gender });
    await newUser.save();
    res.redirect("/users");
  } catch (error) {
    res.send(error);
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, () => {
  console.log(`server is active on port : ${port}`);
});
