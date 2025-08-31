import mongoose from 'mongoose';

const supplySchema = new mongoose.Schema({
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  date: { type: Date, default: Date.now },
  items: [
    {
      name: String,
      quantity: Number,
      fromWarehouse: { type: Boolean, default: true }, // true = 80%, false = 20% libre
    }
  ],
  percentWarehouse: Number, // calculé côté back
  percentLibre: Number // calculé côté back
});

export default mongoose.model('Supply', supplySchema);
