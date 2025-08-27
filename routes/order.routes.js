import express from 'express';
import Order from '../models/order.js';
const router = express.Router();

// CRUD Order
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});

router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});

router.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
