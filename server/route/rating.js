import express from 'express';
import {
  listRating,
  createRating,
  updateRatingById,
} from '../controllers/rating.js';

const ratingRouter = express.Router();

//ratings GET
ratingRouter.get('/rating', listRating);
// Create POST
ratingRouter.post('/rating', createRating);
// Update PUT
ratingRouter.put('/rating/:id', updateRatingById);

export default listRating;
