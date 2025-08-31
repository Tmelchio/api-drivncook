import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

export const authorizeFranchisee = (req, res, next) => {
  if (req.user?.role !== 'franchisee') {
    return res.status(403).json({ error: 'Accès réservé aux franchisés' });
  }
  next();
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux admins' });
  }
  next();
};

// Vérifie que le franchisé ne manipule que ses propres données
export const checkFranchiseeOwnership = (req, res, next) => {
  if (req.user.role === 'franchisee') {
    // Pour les routes avec franchiseId dans req.body ou req.query
    const fid = req.body.franchiseId || req.query.franchiseId;
    if (fid && fid != req.user.franchiseId.toString()) {
      return res.status(403).json({ error: 'Accès interdit à cette franchise' });
    }
  }
  next();
};
