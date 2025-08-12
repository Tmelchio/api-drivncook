const mongoose = require('mongoose');

const breakdownSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Breakdown', breakdownSchema);
