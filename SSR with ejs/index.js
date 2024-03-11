const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const userRouter = require("./routes/user.js");
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
app.use(methodOverride("_method"));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routers)
app.use("/users", userRouter);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, () => {
  console.log(`server is active on port : ${port}`);
});
