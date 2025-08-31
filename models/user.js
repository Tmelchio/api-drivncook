import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  nom: String,
  prenom: String,
  adresseLivraison: String,
  dateNaissance: Date,
  role: { type: String, enum: ['franchisee', 'client', 'admin'], required: true }
});

export default mongoose.model('User', userSchema);