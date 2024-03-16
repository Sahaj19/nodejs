const express = require("express");
const router = express.Router();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
