import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
