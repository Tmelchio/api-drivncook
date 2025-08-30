import express from 'express';
import { addReview, getReviewsByTruck, getAllReviews, deleteReview, updateReview } from '../controllers/review.controller.js';

const router = express.Router();

// Ajouter un avis
router.post('/', addReview);
// Récupérer tous les avis
router.get('/', getAllReviews);
// Récupérer les avis d'un truck
router.get('/:truckId', getReviewsByTruck);
// Supprimer un avis
router.delete('/:id', deleteReview);
// Modifier un avis
router.put('/:id', updateReview);

export default router;
