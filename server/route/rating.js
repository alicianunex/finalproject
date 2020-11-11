import express from 'express';
import { listRating } from '../controllers/rating.js';

const ratingRouter = express.Router();

//ratings
ratingRouter.get('/rating', listRating);

export default listRating;
