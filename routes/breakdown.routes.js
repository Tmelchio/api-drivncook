import express from 'express';
import Breakdown from '../models/breakdown.js';
const router = express.Router();

// CRUD Breakdown
router.get('/', async (req, res) => {
  const breakdowns = await Breakdown.find();
  res.json(breakdowns);
});

router.get('/:id', async (req, res) => {
  const breakdown = await Breakdown.findById(req.params.id);
  if (!breakdown) return res.status(404).json({ error: 'Not found' });
  res.json(breakdown);
});

router.post('/', async (req, res) => {
  try {
    const breakdown = new Breakdown(req.body);
    await breakdown.save();
    res.status(201).json(breakdown);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const breakdown = await Breakdown.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!breakdown) return res.status(404).json({ error: 'Not found' });
  res.json(breakdown);
});

router.delete('/:id', async (req, res) => {
  const breakdown = await Breakdown.findByIdAndDelete(req.params.id);
  if (!breakdown) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
