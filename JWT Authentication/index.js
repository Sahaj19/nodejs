const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const userRouter = require("./routes/user.js");
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/JWT-Authentication");
    console.log("DB connected successfuly!");
  } catch (error) {
    console.log("DB failed to connect!", error.message);
  }
}

main();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

app.get("/toys", (req, res) => {
  res.render("pages/toys.ejs");
});

app.use("/", userRouter);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
