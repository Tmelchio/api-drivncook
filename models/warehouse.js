import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Warehouse', warehouseSchema);
