const mongoose = require('mongoose');

const DispositionSchema = new mongoose.Schema({
  leadID: { type: String, required: true },
  status: { type: String, required: true },
  remarks: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Disposition', DispositionSchema);
