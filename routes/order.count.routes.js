import Order from '../models/order.js';
import express from 'express';
const router = express.Router();

// GET /orders/count/:userId : nombre d'achats d'un utilisateur
router.get('/count/:userId', async (req, res) => {
  try {
    const count = await Order.countDocuments({ userId: req.params.userId });
    res.json({ count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
