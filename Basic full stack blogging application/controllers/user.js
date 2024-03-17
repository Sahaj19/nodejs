const User = require("../models/user.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function handleMongooseErrors(error) {
  //relevant errors will be displayed here
  let error_object = {
    fullname: "",
    email: "",
    password: "",
  };

  //handling unique email error (code : 11000)
  if (error.code === 11000) {
    error_object.email =
      "This email is already registered, try again with a different email!";
  }

  //handling validation errors
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      const { path, message } = properties;
      error_object[path] = message;
    });
  }

  //returning our error object
  return error_object;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
function signup_get(req, res) {
  res.render("user/signup.ejs");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function signup_post(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const user = new User({ fullname, email, password });
    await user.save();
    res.send(user);
  } catch (error) {
    const errors = handleMongooseErrors(error);
    res.render("error/error.ejs", { errors });
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function login_get(req, res) {
  res.render("user/login.ejs");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function login_post() {}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function logout() {}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout,
};
