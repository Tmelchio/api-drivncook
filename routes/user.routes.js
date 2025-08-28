
import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// Changement de mot de passe avec vérification de l'actuel
router.put('/:id/password', async (req, res) => {
  const { current, newPassword } = req.body;
  if (!current || !newPassword) return res.status(400).json({ error: 'Champs manquants.' });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
  const match = await bcrypt.compare(current, user.motDePasse);
  if (!match) return res.status(400).json({ error: 'Mot de passe actuel incorrect.' });
  user.motDePasse = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Mot de passe modifié.' });
});

// Liste des utilisateurs
// DEBUG: Inclure le mot de passe hashé pour vérification
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Détail utilisateur
// DEBUG: Inclure le mot de passe hashé pour vérification
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// Création utilisateur
router.post('/', async (req, res) => {
  try {
    const { motDePasse, ...rest } = req.body;
    if (!motDePasse || motDePasse.length < 3) {
      return res.status(400).json({ error: 'Le mot de passe est obligatoire (3 caractères minimum).' });
    }
    if (typeof motDePasse !== 'string' || !motDePasse.trim()) {
      return res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
    }
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({ ...rest, motDePasse: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Modification utilisateur
// Modification utilisateur (ne jamais écraser le mot de passe si non fourni)
router.put('/:id', async (req, res) => {
  try {
    const update = { ...req.body };
    // Ne jamais écraser le mot de passe si non fourni
    if (typeof update.motDePasse === 'undefined' || update.motDePasse === '') {
      delete update.motDePasse;
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Suppression utilisateur
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
