import express from 'express';
import { subscribe, listSubscribers } from '../controllers/newsletter.controller.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', listSubscribers);

export default router;
