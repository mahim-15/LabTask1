const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: String,
  category: { type: String, required: true },
  thumbnailUrl: String,
  embedUrl: String,
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  plays: { type: Number, default: 0 },
});

module.exports = mongoose.model('Game', GameSchema);
