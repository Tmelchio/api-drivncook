import mongoose from 'mongoose';

const BreakdownReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  description: { type: String, required: true },
  maintenance: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const BreakdownReport = mongoose.model('BreakdownReport', BreakdownReportSchema);
export default BreakdownReport;
