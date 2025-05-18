const mongoose = require('mongoose');

const failedNotificationSchema = new mongoose.Schema({
  userId: String,
  type: String,
  message: String,
  contact: String,
  error: String,
  retries: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FailedNotification', failedNotificationSchema);
 
