const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance', 'breakdown'], default: 'active' },
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Truck', truckSchema);
