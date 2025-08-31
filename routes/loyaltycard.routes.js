import express from 'express';
import LoyaltyCard from '../models/loyaltycard.js';
const router = express.Router();

// GET all loyalty cards
router.get('/', async (req, res) => {
  try {
    const cards = await LoyaltyCard.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one loyalty card
router.get('/:id', async (req, res) => {
  try {
    const card = await LoyaltyCard.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE loyalty card
router.post('/', async (req, res) => {
  try {
    const card = new LoyaltyCard(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE loyalty card
router.post('/:id', async (req, res) => {
  try {
    const card = await LoyaltyCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ error: 'Not found' });
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE loyalty card
router.delete('/:id', async (req, res) => {
  try {
    await LoyaltyCard.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
