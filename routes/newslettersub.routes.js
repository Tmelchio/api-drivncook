import express from 'express';
import NewsletterSub from '../models/newslettersub.js';
const router = express.Router();

// GET all newsletter subs
router.get('/', async (req, res) => {
  try {
    const subs = await NewsletterSub.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one newsletter sub
router.get('/:id', async (req, res) => {
  try {
    const sub = await NewsletterSub.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE newsletter sub
router.post('/', async (req, res) => {
  try {
    const sub = new NewsletterSub(req.body);
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE newsletter sub
router.post('/:id', async (req, res) => {
  try {
    const sub = await NewsletterSub.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sub) return res.status(404).json({ error: 'Not found' });
    res.json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE newsletter sub
router.delete('/:id', async (req, res) => {
  try {
    await NewsletterSub.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
