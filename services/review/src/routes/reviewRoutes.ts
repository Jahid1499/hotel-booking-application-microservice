import { createReview, editReview } from '@/controller';
import express from 'express';

const reviewRoutes = express.Router();

reviewRoutes.post('/reviews', createReview)
reviewRoutes.put('/reviews/:id', editReview)

export default reviewRoutes;