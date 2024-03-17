const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const port = 3000;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, function () {
  console.log(`server is active on port: ${port}`);
});
