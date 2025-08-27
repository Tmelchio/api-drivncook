import express from 'express';
import Franchise from '../models/franchise.js';
const router = express.Router();

// CRUD Franchise
router.get('/', async (req, res) => {
  const franchises = await Franchise.find().populate('userId entrepotPrincipal');
  res.json(franchises);
});

router.get('/:id', async (req, res) => {
  const franchise = await Franchise.findById(req.params.id).populate('userId entrepotPrincipal');
  if (!franchise) return res.status(404).json({ error: 'Not found' });
  res.json(franchise);
});

router.post('/', async (req, res) => {
  try {
    const franchise = new Franchise(req.body);
    await franchise.save();
    res.status(201).json(franchise);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const franchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!franchise) return res.status(404).json({ error: 'Not found' });
  res.json(franchise);
});

router.delete('/:id', async (req, res) => {
  const franchise = await Franchise.findByIdAndDelete(req.params.id);
  if (!franchise) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
