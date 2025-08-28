import express from 'express';
import { addReview, getReviews } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/', addReview);
router.get('/', getReviews);

export default router;
