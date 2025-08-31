
import express from 'express';
import Sale from '../models/sale.js';
// import { authenticate, authorizeFranchisee, checkFranchiseeOwnership } from '../middlewares/auth.middleware.js';
const router = express.Router();

// CRUD Sale

// Liste des ventes (accessible à tous)
router.get('/', async (req, res) => {
  const filter = {};
  console.log('GET /api/sales called');
  // Optionnel : filtrer par franchiseId via truck
  // if (req.query.franchiseId) filter.franchiseId = req.query.franchiseId;
  try {
    let sales = await Sale.find(filter)
      .populate({ path: 'truckId', select: 'plate address city' })
      .populate({ path: 'userId', select: 'nom prenom' })
      .populate({ path: 'menus.menuId', select: 'name price' });
    console.log('Nombre de ventes trouvées:', sales.length);
    if (sales.length > 0) {
      console.log('Exemple vente:', JSON.stringify(sales[0], null, 2));
    }
    res.json(sales);
  } catch (e) {
    console.error('Erreur dans GET /api/sales:', e);
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json(sale);
});


// Création d'une vente (sécurisé)
router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


// Modification d'une vente (sécurisé)
router.put('/:id', async (req, res) => {
  const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json(sale);
});


// Suppression d'une vente (sécurisé)
router.delete('/:id', async (req, res) => {
  const sale = await Sale.findByIdAndDelete(req.params.id);
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
