const jwt = require("jsonwebtoken");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function isLoggedIn(req, res, next) {
  let jwt_token = req.cookies.jwt;

  if (jwt_token) {
    jwt.verify(jwt_token, process.env.SECRET, (error) => {
      if (error) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = { isLoggedIn };
