const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const port = 3000;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Blogs-App");
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("DB failed to connect", error);
  }
}

main();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

//routers
app.use("/", userRouter);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, function () {
  console.log(`server is active on port: ${port}`);
});
