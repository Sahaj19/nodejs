const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(cookieParser("SECRET"));

app.get("/create-cookies", function (req, res) {
  res.cookie("name", "sahaj", { signed: true });
  res.send("signed cookies created");
});

//agar humne tampering nahi ki hogi
//toh { name : 'sahaj' } print hojayega
//agar tampeirng ki hogi toh
// { name : false } print hojayega

/*
//agar tempering ki toh

{ key : false }
{ value : false }
*/

/*
//agar puri value hi change kardi

{}
*/

app.get("/get-cookies", function (req, res) {
  console.log(req.signedCookies);
  console.log(req.cookies);
  res.send("received");
});

app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
