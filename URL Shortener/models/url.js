const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(url schema)
const urlSchema = new Schema({
  originalUrl: {
    type: String,
    trim: true,
    required: [true, "Please provide a url!"],
  },
  shortUrl: {
    type: String,
    default: uuidv4(),
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(url model)
const URL = mongoose.model("URL", urlSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = URL;
