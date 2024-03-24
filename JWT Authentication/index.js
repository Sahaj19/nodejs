require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./middlewares/authentication.js");
const { isOwner } = require("./middlewares/authorization.js");
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(database connection)
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
//(middlewares)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routes)

app.use(isOwner);

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

app.get("/toys", isLoggedIn, (req, res) => {
  res.render("pages/toys.ejs");
});

app.use("/", userRouter);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//port : 3000
app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
