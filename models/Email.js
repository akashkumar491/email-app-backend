const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: String,
  sender: String,
  body: String,
  isRead: Boolean,
  isFavourite: Boolean,
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', emailSchema);
