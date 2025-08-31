import express from 'express';
import EventCustom from '../models/eventcustom.js';
const router = express.Router();

// GET all custom events
router.get('/', async (req, res) => {
  try {
    const events = await EventCustom.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one custom event
router.get('/:id', async (req, res) => {
  try {
    const event = await EventCustom.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE custom event
router.post('/', async (req, res) => {
  try {
    const event = new EventCustom(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE custom event
router.post('/:id', async (req, res) => {
  try {
    const event = await EventCustom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE custom event
router.delete('/:id', async (req, res) => {
  try {
    await EventCustom.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
