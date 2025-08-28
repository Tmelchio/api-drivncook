import express from 'express';
import Truck from '../models/truck.js';
const router = express.Router();

// CRUD Truck
router.get('/', async (req, res) => {
  const trucks = await Truck.find();
  res.json(trucks);
});

router.get('/:id', async (req, res) => {
  const truck = await Truck.findById(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json(truck);
});

router.post('/', async (req, res) => {
  // Force tous les champs à être présents (string vide si non fourni)
  const truckData = {
    plate: req.body.plate || '',
    city: req.body.city || '',
    address: req.body.address || '',
    schedule: req.body.schedule || '',
    status: req.body.status || 'active',
  };
  if (!truckData.plate || !truckData.city || !truckData.address || !truckData.schedule) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires (plaque, ville, adresse, horaires).' });
  }
  try {
    const truck = new Truck(truckData);
    await truck.save();
    res.status(201).json(truck);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Not found' });
    // Met à jour chaque champ explicitement pour éviter d'écraser avec undefined
    truck.plate = req.body.plate !== undefined ? req.body.plate : truck.plate;
    truck.city = req.body.city !== undefined ? req.body.city : truck.city;
    truck.address = req.body.address !== undefined ? req.body.address : truck.address;
    truck.schedule = req.body.schedule !== undefined ? req.body.schedule : truck.schedule;
    truck.status = req.body.status !== undefined ? req.body.status : truck.status;
    await truck.save();
    res.json(truck);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const truck = await Truck.findByIdAndDelete(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
