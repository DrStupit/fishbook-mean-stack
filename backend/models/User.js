const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let User = new Schema ({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean },
  cellNo: { type: String, unique: true, required: true, trim: true }
});

module.exports = User = mongoose.model("users", User);
