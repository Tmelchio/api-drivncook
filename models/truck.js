import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance', 'breakdown'], default: 'active' },
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  location: { type: String },
  city: { type: String, required: true },
  address: { type: String, required: true },
  schedule: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Truck', truckSchema);
