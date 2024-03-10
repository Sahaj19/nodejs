const mongoose = require("mongoose");
const { Schema } = mongoose;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(userSchema)
const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    trim: true,
    lowercase: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(user model)
const User = mongoose.model("User", userSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(let's export our user model)
module.exports = User;
