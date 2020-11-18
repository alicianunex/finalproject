import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    ratings: [
      {
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    gbGameId: Number,
  },
  {
    timestamps: true,
  },
);
const Rating = mongoose.model('Rating', RatingSchema);
//Finds all ratings within the database (not used in the client)
export const getAllRating = async () => {
  try {
    return await Rating.find();
  } catch (error) {
    throw new Error(error);
  }
};
//Creates a new rating
export const createRatingResource = async (data) => {
  try {
    console.log('reached here');
    return await Rating.create({ ...data });
  } catch (error) {
    throw new Error(error);
  }
};
//Adds a new rating to the specific object matching the id passed by the function
export const updateRatingResource = async (id, data) => {
  console.log(data);
  try {
    //First finds the specific rating by it's id and saves it as variable (an array is saved)
    const ratingToUpdate = await Rating.findById(id);
    //Pushes the new rating submitted into the 'ratings' array that exits in the object
    ratingToUpdate.ratings.push(data);
    // Uses the save  method from Mongoose to save the object with the rating added back to the database
    ratingToUpdate.save();
    return ratingToUpdate;
  } catch (error) {
    throw new Error(error);
  }
};
//This function specifically looks for objects matching the GiantBomb game ID passed through this route
export const getRatingResourceByGBId = async (id) => {
  try {
    const rating = await Rating.find({ gbGameId: id });
    return rating;
  } catch (error) {
    throw new Error(error);
  }
};

export default Rating;
