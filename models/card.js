const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate card with user
  card: { type: String, required: true }
});

module.exports = mongoose.model("Card", CardSchema);
