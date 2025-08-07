import mongoose from 'mongoose';

const franchiseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateAdhesion: Date,
  chiffreAffaires: Number,
  entrepotPrincipal: { type: mongoose.Schema.Types.ObjectId, ref: 'Entrepot' }
});

export default mongoose.model('Franchise', franchiseSchema);
