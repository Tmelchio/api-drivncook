import express from 'express';
import BreakdownReport from '../models/breakdownreport.js';
import Truck from '../models/truck.js';
const router = express.Router();

// Créer un signalement de panne/entretien
router.post('/', async (req, res) => {
  try {
    const { userId, truckId, description, maintenance } = req.body;
    if (!userId || !truckId || !description) {
      return res.status(400).json({ error: 'Champs manquants' });
    }
    // Créer le signalement
    const report = await BreakdownReport.create({ userId, truckId, description, maintenance });
    // Mettre à jour le statut du camion
    await Truck.findByIdAndUpdate(truckId, { status: 'En panne' });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optionnel) Lister les signalements
router.get('/', async (req, res) => {
  try {
    const reports = await BreakdownReport.find().populate('userId', 'email').populate('truckId', 'plate');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
