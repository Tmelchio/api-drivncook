import express from 'express';
import BreakdownHistory from '../models/breakdownHistory.js';
import Truck from '../models/truck.js';
const router = express.Router();

// Créer une panne
router.post('/', async (req, res) => {
  try {
    const { userId, truckId, description } = req.body;
    if (!userId || !truckId || !description) {
      return res.status(400).json({ error: 'Champs manquants' });
    }
    // Créer l'historique
    const breakdown = await BreakdownHistory.create({ userId, truckId, description });
    // Mettre à jour le statut du camion
    await Truck.findByIdAndUpdate(truckId, { status: 'En panne' });
    res.status(201).json(breakdown);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Historique des pannes d'un utilisateur
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    if (userId) query.userId = userId;
    // Si pas de userId, retourne tout l'historique
    const history = await BreakdownHistory.find(query)
      .populate('truckId', 'plate')
      .sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
