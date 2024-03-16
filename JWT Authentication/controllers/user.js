const User = require("../models/user.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function signup_get(req, res) {
  res.render("users/signup.ejs");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function signup_post(req, res) {}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function login_get(req, res) {
  res.render("users/login.ejs");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function login_post(req, res) {}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function logout(req, res) {}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout,
};
