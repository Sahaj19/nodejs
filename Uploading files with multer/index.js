const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

/*
this will create corrupt files...
const upload = multer({ dest: "uploads" });
*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    return callback(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route)
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.file);
  res.redirect("/");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port : 3000)
app.listen(3000, () => {
  console.log(`server is active...`);
});
