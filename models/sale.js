const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
