import mongoose from 'mongoose';

const NewsletterSubSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String },
  content: { type: String }
});

const NewsletterSub = mongoose.model('NewsletterSub', NewsletterSubSchema);
export default NewsletterSub;
