import mongoose from 'mongoose';

const EventCustomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  location: { type: String }
});

const EventCustom = mongoose.model('EventCustom', EventCustomSchema);
export default EventCustom;
