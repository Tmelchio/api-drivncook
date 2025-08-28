import Newsletter from '../models/newsletter.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Déjà inscrit' });
    const sub = new Newsletter({ email });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listSubscribers = async (req, res) => {
  try {
    const subs = await Newsletter.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
