
import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  items: [
    {
      name: String,
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      quantity: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;
