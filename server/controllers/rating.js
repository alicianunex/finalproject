import { getAllRating, createRatingResource, updateRatingResource, getRatingResourceByGBId } from '../models/rating.js';
// From the URL GET /Rating
export const listRating = async (request, response, next) => {
  try {
    const RatingList = await getAllRating();
    return response.status(200).send(RatingList);
  } catch (error) {
    return response.status(500).send({
      message: `Error: connection to database failed, ${error}.`,
    });
  }
};

// From the URL GET /Rating/:id
export const getRatingByGBId = async (request, response, next) => {
  // URL parameters defined in the router
  const {
    params: { id },
  } = request;
  // Call a function that is declared in the resource model
  const RatingResource = await getRatingResourceByGBId(id);
  console.log('resource rating is', RatingResource.length)
  if (RatingResource.length === 0) {
    return response.status(404).send({
      message: 'Error: Rating resource not found.',
    })
    // return resource and 200 OK status
    
  } else if (RatingResource) {
    // if not sent 404 Resource not found
    return response.status(200).send(RatingResource);
  }
};

// From the URL PUT /Rating/:id
export const updateRatingById = async (request, response) => {
  // get access to the data sent it by the client
  const {
    params: { id },
    body,
  } = request;
  console.log(body)
  try {
    // Call a function that is declared in the resource model
    const RatingResource = await updateRatingResource(id, body);
    return response.status(200).send(RatingResource);
  } catch (error) {
    const { message } = error;
    return response.status(404).send({
      message,
    });
  }
};

// POST /Rating with JSON in the body
export const createRating = async (request, response) => {
  // get access to the data sent it by the client

  const { body } = request;
  console.log(body)
  try {
    // Call a function that is declared in the resource model
    console.log('reached here')
    const newRatingResource = await createRatingResource(body);
    return response.status(201).send(newRatingResource);
  } catch (error) {
    // Because Daytabases can be in other location can't assume that every DB request is succesful
    return response.status(500).send({
      message: `Error: not connection to database, ${error}.`,
    });
  }
};
