const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

const userSchema = new Schema({
  fullname: {
    type: String,
    minlength: [3, "Fullname should have a minimum of 3 characters"],
    maxlength: [30, "Fullname should have a maximum of 30 characters only!"],
    required: [true, "Fullname is required!"],
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Please enter a valid email!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    minlength: [6, "Password should contain a minimum of 6 characters!"],
    maxlength: [15, "Password should contain a maximum of 15 characters only!"],
    required: [true, "Password is required!"],
  },
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = mongoose.model("User", userSchema);
