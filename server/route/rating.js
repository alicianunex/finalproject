import express from 'express';
import {
  listRating,
  createRating,
  updateRatingById,
  getRatingByGBId,
} from '../controllers/rating.js';

const ratingRouter = express.Router();

//ratings GET
ratingRouter.get('/rating', listRating);
//rating GET by GB ID
ratingRouter.get('/rating/:id', getRatingByGBId);
// Create POST
ratingRouter.post('/rating', createRating);
// Update PUT
ratingRouter.put('/rating/:id', updateRatingById);

export default ratingRouter