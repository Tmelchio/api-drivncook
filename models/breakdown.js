
import mongoose from 'mongoose';

const breakdownSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['reported', 'in_progress', 'resolved'], default: 'reported' },
  reportedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  maintenance: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Breakdown', breakdownSchema);
