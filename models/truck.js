import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance', 'breakdown'], default: 'active' },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
  location: { type: String },
  city: { type: String, required: true },
  address: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  codePostal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Truck', truckSchema);
