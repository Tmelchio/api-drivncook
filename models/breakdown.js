import mongoose from 'mongoose';

const breakdownSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Breakdown', breakdownSchema);
