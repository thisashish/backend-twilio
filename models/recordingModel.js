const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  callSid: { type: String, required: true },
  recordingUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
