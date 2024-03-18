const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js");
const path = require("path");
const multer = require("multer");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/newBlog", (req, res) => {
  res.render("pages/new.ejs");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const upload_folder = path.join(__dirname, "../public/uploads/");
    return callback(null, upload_folder);
  },
  filename: function (req, file, callback) {
    return callback(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/", upload.single("coverImg"), async (req, res) => {
  const { title, description } = req.body;

  //creating new blog
  const newBlog = new Blog({ title, description });
  newBlog.coverImg = `/uploads/${req.file.filename}`;
  newBlog.owner = res.locals.currentUser._id;
  await newBlog.save();

  //redirecting to home page
  console.log(newBlog);
  res.redirect("/");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
