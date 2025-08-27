import express from 'express';
import Sale from '../models/sale.js';
const router = express.Router();

// CRUD Sale
router.get('/', async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

router.get('/:id', async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json(sale);
});

router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json(sale);
});

router.delete('/:id', async (req, res) => {
  const sale = await Sale.findByIdAndDelete(req.params.id);
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
