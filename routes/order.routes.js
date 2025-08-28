import express from 'express';
import Order from '../models/order.js';
const router = express.Router();

// CRUD Order
// GET /orders : renvoie toutes les infos utiles pour l'admin
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    const orders = await Order.find(filter)
      .populate({ path: 'userId', select: 'email nom prenom adresseLivraison' })
      .populate({ path: 'truckId', select: 'plate city address schedule' });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});

// POST /orders : attend { userId, truckId, truckPlate, truckCity, menus: [{menuId, name, price, quantity}], date, status }
router.post('/', async (req, res) => {
  try {
    const { userId, truckId, menus } = req.body;
    if (!userId || !truckId || !menus || !Array.isArray(menus) || menus.length === 0) {
      return res.status(400).json({ error: 'Champs obligatoires manquants (userId, truckId, menus)' });
    }
    // Validation des menus
    for (const m of menus) {
      if (!m.menuId || !m.name || typeof m.price !== 'number' || typeof m.quantity !== 'number') {
        return res.status(400).json({ error: 'Champs menu manquants (menuId, name, price, quantity)' });
      }
    }
    const order = new Order({
      userId: req.body.userId,
      truckId: req.body.truckId,
      truckPlate: req.body.truckPlate,
      truckCity: req.body.truckCity,
      menus: req.body.menus,
      date: req.body.date || new Date(),
      status: req.body.status || 'en attente'
    });
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
