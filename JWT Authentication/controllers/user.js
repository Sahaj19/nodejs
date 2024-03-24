const User = require("../models/user.js");
const { errorHandler } = require("../middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(jwt generation)

let maxage = 3 * 24 * 60 * 60;
function generateToken(id) {
  let token = jwt.sign({ id }, process.env.SECRET, { expiresIn: maxage });
  return token;
}

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
    /* jwt generation */
    let jwt_token = generateToken(newUser._id);
    res.cookie("jwt", jwt_token, { httpOnly: true, maxAge: maxage * 1000 });
    /* */
    res.redirect("/");
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

async function login_post(req, res) {
  try {
    const { email, password } = req.body;
    let required_user = await User.findOne({ email });
    if (required_user) {
      let Auth = await bcrypt.compare(password, required_user.password);
      if (Auth) {
        /* jwt generation  */
        let jwt_token = generateToken(required_user._id);
        res.cookie("jwt", jwt_token, { httpOnly: true, maxAge: maxage * 1000 });
        /* */
        res.redirect("/");
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (error) {
    let errorObject = errorHandler(error);
    res.render("error/errors.ejs", { errorObject });
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function logout(req, res) {
  res.cookie("jwt", " ", { maxAge: 1 });
  res.redirect("/");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout,
};
