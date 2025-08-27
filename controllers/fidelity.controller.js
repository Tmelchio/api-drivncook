
import Fidelity from '../models/fidelity.js';

export const getFidelityByUser = async (req, res) => {
  try {
    const fidelity = await Fidelity.findOne({ userId: req.params.userId });
    if (!fidelity) return res.status(404).json({ error: 'Fidelity not found' });
    res.json(fidelity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const { points } = req.body;
    const fidelity = await Fidelity.findOneAndUpdate(
      { userId },
      { $inc: { points } },
      { new: true, upsert: true }
    );
    res.json(fidelity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
