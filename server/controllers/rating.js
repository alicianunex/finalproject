import { getAllRating } from '../models/rating.js';
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
export const getRatingById = async (request, response, next) => {
  // URL parameters defined in the router
  const {
    params: { id },
  } = request;
  // Call a function that is declared in the resource model
  const RatingResource = await getRatingResourceById(id);
  // If we have a Rating resource
  if (RatingResource) {
    // return resource and 200 OK status
    return response.status(200).send(RatingResource);
  } else {
    // if not sent 404 Resource not found
    return response.status(404).send({
      message: 'Error: Rating resource not found.',
    });
  }
};

// From the URL PUT /Rating/:id
export const updateRatingById = async (request, response) => {
  // get access to the data sent it by the client
  const {
    params: { id },
    body,
  } = request;

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

  try {
    // Call a function that is declared in the resource model
    const newRatingResource = await createRatingResource(body);
    return response.status(201).send(newRatingResource);
  } catch (error) {
    // Because Daytabases can be in other location can't assume that every DB request is succesful
    return response.status(500).send({
      message: `Error: not connection to database, ${error}.`,
    });
  }
};
