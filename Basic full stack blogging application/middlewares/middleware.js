const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function isLoggedIn(req, res, next) {
  try {
    let jwt_token = req.cookies.jwt;

    if (jwt_token) {
      jwt.verify(jwt_token, process.env.SECRET, (error, decodedToken) => {
        if (error) {
          res.redirect("/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function currentUser(req, res, next) {
  let jwt_token = req.cookies.jwt;

  if (jwt_token) {
    jwt.verify(jwt_token, process.env.SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.currentUser = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.currentUser = user;
        // console.log(user);
        next();
      }
    });
  } else {
    res.locals.currentUser = null;
    next();
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = { isLoggedIn, currentUser };
