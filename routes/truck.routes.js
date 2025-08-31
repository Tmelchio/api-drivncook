
import express from 'express';
import Truck from '../models/truck.js';
// import { authenticate, authorizeFranchisee, checkFranchiseeOwnership } from '../middlewares/auth.middleware.js';
const router = express.Router();

// CRUD Truck


// Liste publique de tous les camions (accessible sans authentification)
// Toujours filtrer par franchiseId si fourni, sinon retourner un tableau vide (plus sécurisé)
router.get('/', async (req, res) => {
  let trucks;
  if (req.query.franchiseId) {
    const filter = { franchiseId: req.query.franchiseId };
    trucks = await Truck.find(filter);
  } else {
    trucks = await Truck.find();
  }
  // Log côté serveur pour debug
  if (trucks.length > 0) {
    console.log('Exemple de truck envoyé au front:', trucks[0]);
  }
  // Force l'inclusion de franchiseId dans la réponse JSON
  const trucksWithFranchiseId = trucks.map(truck => {
    const obj = truck.toObject();
    obj.franchiseId = truck.franchiseId;
    return obj;
  });
  return res.json(trucksWithFranchiseId);
});

router.get('/:id', async (req, res) => {
  const truck = await Truck.findById(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json(truck);
});

// Création d'un camion (sécurisé)
router.post('/', async (req, res) => {
  // Force tous les champs à être présents (string vide si non fourni)
  const truckData = {
    plate: req.body.plate || '',
    city: req.body.city || '',
    address: req.body.address || '',
    codePostal: req.body.codePostal || '',
    startTime: req.body.startTime || '',
    endTime: req.body.endTime || '',
    status: req.body.status || 'active',
    franchiseId: req.body.franchiseId || '',
  };
  if (!truckData.plate || !truckData.city || !truckData.address || !truckData.startTime || !truckData.endTime || !truckData.codePostal || !truckData.franchiseId) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires (plaque, ville, adresse, code postal, heure début, heure fin, franchiseId).' });
  }
  try {
    const truck = new Truck(truckData);
    await truck.save();
    console.log('Truck créé:', truck);
    res.status(201).json(truck);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Modification d'un camion (sécurisé)
router.put('/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Not found' });
    // Met à jour chaque champ explicitement pour éviter d'écraser avec undefined
  truck.plate = req.body.plate !== undefined ? req.body.plate : truck.plate;
  truck.city = req.body.city !== undefined ? req.body.city : truck.city;
  truck.address = req.body.address !== undefined ? req.body.address : truck.address;
  truck.codePostal = req.body.codePostal !== undefined ? req.body.codePostal : truck.codePostal;
  truck.startTime = req.body.startTime !== undefined ? req.body.startTime : truck.startTime;
  truck.endTime = req.body.endTime !== undefined ? req.body.endTime : truck.endTime;
  truck.status = req.body.status !== undefined ? req.body.status : truck.status;
  truck.franchiseId = req.body.franchiseId !== undefined ? req.body.franchiseId : truck.franchiseId;
    await truck.save();
    res.json(truck);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Suppression d'un camion (sécurisé)
router.delete('/:id', async (req, res) => {
  const truck = await Truck.findByIdAndDelete(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
