const User = require("../models/user.js");
const ExpressError = require("../utils/expresserror.js");

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
const createUserRoute = async (req, res, next) => {
  try {
    let { name, age, gender } = req.body;
    let newUser = new User({ name, age, gender });
    await newUser.save();
    res.redirect("/users");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const showUserRoute = async (req, res, next) => {
  try {
    let { id } = req.params;

    let required_user = await User.findById(id);

    if (!required_user) {
      return next(new ExpressError(404, "User doesn't exist"));
    }
    res.render("users/show.ejs", { required_user });
  } catch (error) {
    console.log(error);
    next(new ExpressError(404, "User ID doesn't exist!"));
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const editUserRoute = async (req, res, next) => {
  try {
    let { id } = req.params;

    let required_user = await User.findById(id);

    if (!required_user) {
      return next(new ExpressError(404, "User doesn't exist"));
    }
    res.render("users/edit.ejs", { required_user });
  } catch (error) {
    console.log(error);
    next(new ExpressError(404, "User ID doesn't exist!"));
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updateUserRoute = async (req, res, next) => {
  try {
    let { id } = req.params;

    let { name, age, gender } = req.body;

    let updated_user = {
      name,
      age,
      gender,
    };

    await User.findByIdAndUpdate(id, updated_user, { runValidators: true });

    res.redirect(`/users/${id}`);
  } catch (error) {
    next(error);
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const deleteUserRoute = async (req, res, next) => {
  try {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (error) {
    next(new ExpressError(400, "User Id don't exist!"));
  }
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
