import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    ratings: [
      { 
        rating: {type: Number, min: 1, max: 5 }
      }
    ],
    gbGameId: Number
  },
  {
    timestamps: true,
  },
);
const Rating = mongoose.model('Rating', RatingSchema);

export const getAllRating = async () => {
  try {
    return await Rating.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const createRatingResource = async (data) => {
  try {
    console.log('reached here')
    return await Rating.create({ ...data });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateRatingResource = async (id, data) => {
  console.log(data)
  try {
    const ratingToUpdate = await Rating.findById(id)
    ratingToUpdate.ratings.push(data)
    ratingToUpdate.save()
    return ratingToUpdate;
  } catch (error) {
    throw new Error(error);
  }
};


export const getRatingResourceByGBId = async (id) => {
  try {
    const rating = await Rating.find({ gbGameId: id});
    return rating
  } catch (error) {
    throw new Error(error);
  }
};

export default Rating;
