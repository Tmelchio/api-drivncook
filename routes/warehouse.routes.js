import express from 'express';
import Warehouse from '../models/warehouse.js';
const router = express.Router();

// CRUD Warehouse
router.get('/', async (req, res) => {
  const warehouses = await Warehouse.find();
  res.json(warehouses);
});

router.get('/:id', async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);
  if (!warehouse) return res.status(404).json({ error: 'Not found' });
  res.json(warehouse);
});

router.post('/', async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!warehouse) return res.status(404).json({ error: 'Not found' });
  res.json(warehouse);
});

router.delete('/:id', async (req, res) => {
  const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
  if (!warehouse) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
