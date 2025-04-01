const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Unique User ID
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false }, // Track if the user verified their email
  resetToken: {type: String, default: ""},
  resetTokenExpires: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", UserSchema);
