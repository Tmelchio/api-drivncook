import express from 'express';
import { getFidelityByUser, addPoints } from '../controllers/fidelity.controller.js';

const router = express.Router();

router.get('/:userId', getFidelityByUser);
router.post('/:userId/add', addPoints);

export default router;
