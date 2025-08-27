import express from 'express';
import Maintenance from '../models/maintenance.js';
const router = express.Router();

// CRUD Maintenance
router.get('/', async (req, res) => {
  const maintenances = await Maintenance.find();
  res.json(maintenances);
});

router.get('/:id', async (req, res) => {
  const maintenance = await Maintenance.findById(req.params.id);
  if (!maintenance) return res.status(404).json({ error: 'Not found' });
  res.json(maintenance);
});

router.post('/', async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!maintenance) return res.status(404).json({ error: 'Not found' });
  res.json(maintenance);
});

router.delete('/:id', async (req, res) => {
  const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
  if (!maintenance) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
