const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

const blogSchema = new Schema({
  title: {
    type: String,
    minlength: [10, "Blog title should have a minimum of 10 characters!"],
    maxlength: [50, "Blog title should have a maximum of 50 characters only!"],
    trim: true,
    required: [true, "Blog title is required!"],
  },
  description: {
    type: String,
    minlength: [50, "Blog description should have a minimum of 50 characters!"],
    maxlength: [
      2000,
      "Blog description should have a maximum of 2000 characters only!",
    ],
    required: [true, "Blog description is required!"],
  },
  coverImg: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = mongoose.model("Blog", blogSchema);
