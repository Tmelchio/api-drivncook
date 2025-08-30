export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('userId', 'nom prenom email').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const update = { ...req.body };
    const review = await Review.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!review) return res.status(404).json({ error: 'Not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Review from '../models/review.js';

export const addReview = async (req, res) => {
  try {
    const { truckId, userId, message, rating } = req.body;
    if (!truckId || !userId || !message || !rating) return res.status(400).json({ error: 'Champs requis manquants' });
    const review = new Review({ truckId, userId, message, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewsByTruck = async (req, res) => {
  try {
  const { truckId } = req.params;
  const reviews = await Review.find({ truckId }).populate('userId', 'nom prenom').sort({ createdAt: -1 });
  res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
