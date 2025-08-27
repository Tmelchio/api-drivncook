import express from 'express';
import Truck from '../models/truck.js';
const router = express.Router();

// CRUD Truck
router.get('/', async (req, res) => {
  const trucks = await Truck.find();
  res.json(trucks);
});

router.get('/:id', async (req, res) => {
  const truck = await Truck.findById(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json(truck);
});

router.post('/', async (req, res) => {
  try {
    const truck = new Truck(req.body);
    await truck.save();
    res.status(201).json(truck);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json(truck);
});

router.delete('/:id', async (req, res) => {
  const truck = await Truck.findByIdAndDelete(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
