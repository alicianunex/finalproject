import mongoose from 'mongoose';
import { databaseURI } from '../index.js';
///Models
import rating from '../models/rating.js';
///Data
import rating from './rating.js';

mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Promise.all(
  rating.map(async (ratingItem) => {
    const ratingResource = await rating.create({ ...ratingItem });
    console.log(
      `The resource ${JSON.stringify(ratingResource)} has been created`,
    );
  }),
);
