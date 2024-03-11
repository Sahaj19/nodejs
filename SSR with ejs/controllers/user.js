const User = require("../models/user.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const indexRoute = async (req, res) => {
  let all_users = await User.find({});
  res.render("users/index.ejs", { all_users });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const newUserRoute = (req, res) => {
  res.render("users/new.ejs");
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const createUserRoute = async (req, res) => {
  try {
    let { name, age, gender } = req.body;
    let newUser = new User({ name, age, gender });
    await newUser.save();
    res.redirect("/users");
  } catch (error) {
    res.send(error);
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const showUserRoute = async (req, res) => {
  let { id } = req.params;
  let required_user = await User.findById(id);
  res.render("users/show.ejs", { required_user });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const editUserRoute = async (req, res) => {
  let { id } = req.params;
  let required_user = await User.findById(id);
  res.render("users/edit.ejs", { required_user });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updateUserRoute = async (req, res) => {
  let { id } = req.params;

  let { name, age, gender } = req.body;

  let updated_user = {
    name,
    age,
    gender,
  };

  await User.findByIdAndUpdate(id, updated_user, { runValidators: true });

  res.redirect(`/users/${id}`);
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const deleteUserRoute = async (req, res) => {
  let { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
  indexRoute,
  newUserRoute,
  createUserRoute,
  showUserRoute,
  editUserRoute,
  updateUserRoute,
  deleteUserRoute,
};
