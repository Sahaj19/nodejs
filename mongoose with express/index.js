const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./DB/user.js");
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(mongodb connection)
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice");
    console.log("practice DB connected successfully!");
  } catch (error) {
    console.log("Connection Error : ", error);
    res.status(500).json({ error: "mongodb connection error" });
  }
}

main();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(middlewares)
app.use(express.urlencoded({ extended: true }));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route)
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, gender } = req.body;
    let newUser = await User.create({ name, email, gender });
    await newUser.save();
    console.log(newUser);
    res.status(201).json({ success: "new user created successfully!" });
  } catch (error) {
    console.error("Error inserting new user:", error);
    res.status(401).json({ error: "Bad request from client" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/api/users/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let required_user = await User.findById(id);

    if (!required_user) {
      return res.status(404).json({ error: "user not found!" });
    }

    console.log(required_user);

    return res.status(200).json(required_user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update route)
app.patch("/api/users/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let { name, email, gender } = req.body;

    let updated_user = {
      name,
      email,
      gender,
    };

    await User.findByIdAndUpdate(id, updated_user, { runValidators: true });

    res.status(200).json({ success: "user updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete("/api/users/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({ success: "user deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "user failed to delete!" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
