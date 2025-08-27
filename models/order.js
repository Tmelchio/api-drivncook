import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
