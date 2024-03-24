const User = require("../models/user.js");
const { errorHandler } = require("../middlewares/errorHandler.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function signup_get(req, res) {
  res.render("users/signup.ejs");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function signup_post(req, res) {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    let errorObject = errorHandler(error);
    res.render("error/errors.ejs", { errorObject });
  }
}

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
