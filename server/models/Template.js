const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail_url: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/300x200?text=Template",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Template", templateSchema);
