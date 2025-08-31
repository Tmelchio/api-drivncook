
import express from 'express';
import Breakdown from '../models/breakdown.js';
import { authenticate, authorizeFranchisee, checkFranchiseeOwnership } from '../middlewares/auth.middleware.js';
const router = express.Router();

// CRUD Breakdown


// Get all breakdowns for a franchise or truck (secured)
router.get('/', async (req, res) => {
  try {
    const { franchiseId, truckId } = req.query;
    const filter = {};
    if (franchiseId) filter.franchiseId = franchiseId;
    if (truckId) filter.truckId = truckId;
    const breakdowns = await Breakdown.find(filter).populate('truckId').sort({ reportedAt: -1 });
    res.json(breakdowns);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const breakdown = await Breakdown.findById(req.params.id);
  if (!breakdown) return res.status(404).json({ error: 'Not found' });
  res.json(breakdown);
});



// Report a new breakdown (secured)
router.post('/', async (req, res) => {
  try {
    const { truckId, franchiseId, description, maintenance, createdBy } = req.body;
    const breakdown = new Breakdown({
      truckId, franchiseId, description, maintenance, createdBy
    });
    await breakdown.save();
    res.status(201).json(breakdown);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


// Update status (in_progress, resolved)
router.put('/:id', async (req, res) => {
  try {
    const { status, resolvedAt } = req.body;
    const breakdown = await Breakdown.findByIdAndUpdate(
      req.params.id,
      { status, resolvedAt: status === 'resolved' ? new Date() : undefined },
      { new: true }
    );
    if (!breakdown) return res.status(404).json({ error: 'Not found' });
    res.json(breakdown);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const breakdown = await Breakdown.findByIdAndDelete(req.params.id);
  if (!breakdown) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
