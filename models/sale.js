import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
