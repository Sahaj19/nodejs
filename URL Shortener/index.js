const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const URL = require("./models/url.js");
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(mongodb connection)
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/url-shortener");
    console.log("url-shortener connected successfully!");
  } catch (error) {
    console.log(error);
    console.log("url-shortener failed to connect!");
  }
}

main();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(middlewares)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/urls", async (req, res) => {
  let all_urls = await URL.find({});
  res.render("index.ejs", { all_urls });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(create route)
app.post("/urls/shorturl", async (req, res) => {
  let { formUrl } = req.body;
  let newURL = new URL({ originalUrl: formUrl });
  await newURL.save();
  //console.log(newURL);
  res.redirect("/urls");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(redirecting route)
app.get("/urls/:shortID", async (req, res) => {
  let { shortID } = req.params;
  let requiredURL = await URL.findOne({ shortUrl: shortID });
  //console.log(requiredURL);
  requiredURL.clicks++;
  await requiredURL.save();
  res.redirect(requiredURL.originalUrl);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete("/urls/:id", async (req, res) => {
  let { id } = req.params;
  await URL.findByIdAndDelete(id);
  res.redirect("/urls");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port : 3000)
app.listen(port, () => {
  console.log(`server is active on port : ${port}`);
});
