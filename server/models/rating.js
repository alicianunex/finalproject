import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    rating: [{ type: Number, min: 1, max: 5 }],
    avgRating: { type: Number },
  },
  {
    timestamps: true,
  },
);
const Rating = mongoose.model('Rating', RatingSchema);

export default RatingSchema;

export const getAllRating = async () => {
  try {
    return await Rating.find();
  } catch (error) {
    throw new Error(error);
  }
};
