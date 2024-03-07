/*
const http = require("http");
const myServer = http.createServer(handlerFunction());
myServer.listen(3000);
*/

const express = require("express");
const app = express(); //handlerFunction()
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
app.METHOD(path , routeHandler)
*/

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  const { name, age, sex } = req.query;
  res.send(`Hello ${name} , ${age} , ${sex}`);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
