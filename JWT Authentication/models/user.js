const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true, //error.code -> 11000
    validate: [isEmail, "Email is not valid, Please enter a valid email!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    minlength: [6, "Minimum Password length should be 6 characters!"],
    required: [true, "Password is required!"],
  },
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const User = mongoose.model("User", userSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = User;
