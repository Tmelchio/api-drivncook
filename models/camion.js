import mongoose from 'mongoose';

const camionSchema = new mongoose.Schema({
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
  localisation: String,
  enPanne: { type: Boolean, default: false },
  carnetEntretien: [
    {
      date: Date,
      commentaire: String
    }
  ]
});

export default mongoose.model('Camion', camionSchema);
