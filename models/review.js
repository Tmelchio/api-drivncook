import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);
