import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  truckPlate: { type: String },
  truckCity: { type: String },
  menus: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'en attente' }
});

export default mongoose.model('Order', orderSchema);
