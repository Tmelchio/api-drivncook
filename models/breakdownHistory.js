import mongoose from 'mongoose';

const BreakdownHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const BreakdownHistory = mongoose.model('BreakdownHistory', BreakdownHistorySchema);
export default BreakdownHistory;
