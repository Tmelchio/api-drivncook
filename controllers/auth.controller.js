import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
  const { email, motDePasse, nom, prenom, adresseLivraison, dateNaissance, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant.' });

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({
      email,
      motDePasse: hashedPassword,
      nom,
      prenom,
      adresseLivraison,
      dateNaissance,
      role
    });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’enregistrement.', error: err });
  }
};

export const login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides.' });

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) return res.status(400).json({ message: 'Identifiants invalides.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err });
  }
};