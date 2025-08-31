import mongoose from 'mongoose';

const LoyaltyCardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  points: { type: Number, default: 0 },
  advantages: { type: String }
});

const LoyaltyCard = mongoose.model('LoyaltyCard', LoyaltyCardSchema);
export default LoyaltyCard;
