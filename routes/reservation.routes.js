
import express from 'express';
import Reservation from '../models/reservation.js';
import Warehouse from '../models/warehouse.js';
import Franchise from '../models/franchise.js';
import Menu from '../models/menu.js';
const router = express.Router();

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const { userId, franchiseId, warehouseId, items } = req.body;
    console.log('POST /api/reservations body:', req.body);
    if (!userId) console.log('userId manquant');
    if (!warehouseId) console.log('warehouseId manquant');
    if (!Array.isArray(items) || items.length === 0) console.log('items manquant ou vide');
    if (!userId || !warehouseId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Champs manquants' });
    }
    const reservationData = { userId, warehouseId, items };
    if (franchiseId) reservationData.franchiseId = franchiseId;
    const reservation = await Reservation.create(reservationData);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lister les réservations d'un utilisateur
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId requis' });
    const reservations = await Reservation.find({ userId })
      .populate('warehouseId', 'name location')
      .populate('franchiseId', 'name')
      .populate('items.menuId', 'name price desc')
      .sort({ date: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
