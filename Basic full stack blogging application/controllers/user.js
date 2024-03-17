const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

  //handling post login errors
  if (error.message === "Incorrect Password!") {
    error_object.password = "Incorrect Password, Try Again!";
  }

  if (error.message === "Incorrect Email!") {
    error_object.email = "Incorrect Email, Try Again!";
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

const expiry_date = 3 * 24 * 60 * 60;

function createToken(id) {
  const jwt_token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: expiry_date,
  });

  return jwt_token;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function signup_post(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const user = new User({ fullname, email, password });
    await user.save();

    //creating jwt
    const jwt_token = createToken(user._id);
    res.cookie("jwt", jwt_token, {
      httpOnly: true,
      maxAge: expiry_date * 1000,
    });

    //redirecting to home page
    res.redirect("/");
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

async function login_post(req, res) {
  try {
    const { email, password } = req.body;

    //let's find our user
    const user = await User.findOne({ email });

    //email check
    if (user) {
      const isPasswordRight = await bcrypt.compare(password, user.password);

      //password check
      if (isPasswordRight) {
        const jwt_token = createToken(user._id);

        res.cookie("jwt", jwt_token, {
          httpOnly: true,
          maxAge: expiry_date * 1000,
        });

        res.redirect("/");
      } else {
        throw Error("Incorrect Password!");
      }
    } else {
      throw Error("Incorrect Email!");
    }
  } catch (error) {
    const errors = handleMongooseErrors(error);
    res.render("error/error.ejs", { errors });
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function logout(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout,
};
