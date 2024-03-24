const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
//(mongoose pre-save hook)
userSchema.pre("save", async function (next) {
  /* 
  console.log(this); 
  this here refers to the document being saved.
  */
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const User = mongoose.model("User", userSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = User;
