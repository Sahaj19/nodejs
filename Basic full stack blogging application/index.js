require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");
const userRouter = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");
const cookieParser = require("cookie-parser");
const { isLoggedIn, currentUser } = require("./middlewares/middleware.js");
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
app.use(cookieParser());

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.use(currentUser);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(home page)

app.get("/", async (req, res) => {
  const all_blogs = await Blog.find({});
  res.render("pages/home.ejs", { all_blogs });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routers)

app.use("/", userRouter);
app.use("/blogs", blogRouter);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, function () {
  console.log(`server is active on port: ${port}`);
});
