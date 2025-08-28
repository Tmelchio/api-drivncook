import Review from '../models/review.js';

export const addReview = async (req, res) => {
  try {
    const { user, comment, rating } = req.body;
    if (!user || !comment || !rating) return res.status(400).json({ error: 'Champs requis manquants' });
    const review = new Review({ user, comment, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
