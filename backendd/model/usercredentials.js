const mongoose = require("mongoose");

const userCredentials = new mongoose.Schema(
  {
    email: String,
    password: String,
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("userCredentials", userCredentials);
