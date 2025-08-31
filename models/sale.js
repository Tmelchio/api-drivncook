
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menus: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      priceReduit: { type: Number },
      quantity: { type: Number, required: true }
    }
  ],
  status: { type: String, default: 'en attente' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
