import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  nom: String,
  prenom: String,
  role: { type: String, enum: ['franchise', 'client', 'admin'], required: true }
});

export default mongoose.model('User', userSchema);