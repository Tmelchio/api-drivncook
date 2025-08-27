import mongoose from 'mongoose';

const fidelitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  advantages: { type: [String], default: [] }
});

const Fidelity = mongoose.model('Fidelity', fidelitySchema);
export default Fidelity;
