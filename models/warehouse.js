import mongoose from 'mongoose';


const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, // localisation simple, peut être enrichie plus tard
  stock: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      quantity: { type: Number, required: true, default: 0 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Warehouse', warehouseSchema);
