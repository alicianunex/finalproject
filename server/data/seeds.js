import mongoose from 'mongoose';
import { databaseURI } from '../index.js';
///Models
import Rating from '../models/rating.js';
///Data
import ratingdata from './rating.js';

mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Promise.all(
  ratingdata.map(async (ratingItem) => {
    const ratingResource = await Rating.create({ ...ratingItem });
    console.log(
      `The resource ${JSON.stringify(ratingResource)} has been created`,
    );
  }),
);
