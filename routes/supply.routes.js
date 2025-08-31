
import express from 'express';
import Supply from '../models/supply.js';
// import { authenticate, authorizeFranchisee, checkFranchiseeOwnership } from '../middlewares/auth.middleware.js';
const router = express.Router();


// Liste des approvisionnements d'un franchisé (sécurisé)
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.franchiseId) filter.franchiseId = req.query.franchiseId;
  const supplies = await Supply.find(filter).populate('franchiseId warehouseId');
  res.json(supplies);
});

// Détail d'un approvisionnement
router.get('/:id', async (req, res) => {
  const supply = await Supply.findById(req.params.id).populate('franchiseId warehouseId');
  if (!supply) return res.status(404).json({ error: 'Not found' });
  res.json(supply);
});


// Création d'un approvisionnement avec contrôle 80/20 (sécurisé)
router.post('/', async (req, res) => {
  try {
    const { items = [] } = req.body;
    const total = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const fromWarehouse = items.filter(i => i.fromWarehouse).reduce((sum, i) => sum + (i.quantity || 0), 0);
    const percentWarehouse = total ? Math.round((fromWarehouse / total) * 100) : 0;
    const percentLibre = 100 - percentWarehouse;
    if (percentWarehouse < 80) {
      return res.status(400).json({ error: 'Au moins 80% du stock doit venir de l\'entrepôt.' });
    }
    const supply = new Supply({ ...req.body, percentWarehouse, percentLibre });
    await supply.save();
    res.status(201).json(supply);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
