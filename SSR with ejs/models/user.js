const mongoose = require("mongoose");
const { Schema } = mongoose;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(user schema)
const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      minlength: [3, "Minimum length should be of 3 characters"],
      maxlength: [30, "Maximum length should be of 30 characters"],
      trim: true,
      required: [true, "Please enter your name!"],
    },
    age: {
      type: Number,
      trim: true,
      min: [18, "Minimum age should be 18"],
      max: [120, "Maximum age should be 120"],
      required: [true, "Please enter your age"],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be either 'male', 'female', or 'other'",
      },
      required: [true, "Please specify your gender"],
    },
  },
  {
    timestamps: true,
  }
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(user model)
const User = mongoose.model("User", userSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(let's export our user model)
module.exports = User;
