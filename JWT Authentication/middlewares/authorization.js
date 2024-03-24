const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function isOwner(req, res, next) {
  let jwt_token = req.cookies.jwt;

  if (jwt_token) {
    jwt.verify(jwt_token, process.env.SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        next();
      } else {
        let logged_in_user = await User.findById(decodedToken.id);
        res.locals.user = logged_in_user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = { isOwner };
