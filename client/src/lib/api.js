const BASE_URL = 'https://www.giantbomb.com/api/games';

const { REACT_APP_SERVER_URL } = process.env;

console.log({ REACT_APP_SERVER_URL });

export const getAllGames = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?api_key=cb575ea5ad8d10edf1bcc1221cd0f11115bc7ed4&format=json&filter=original_release_date:2017-07-01 |2018-12-31`,
    );
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGameById = async (id) => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?api_key=cb575ea5ad8d10edf1bcc1221cd0f11115bc7ed4&format=json&filter=id:${id}`,
    );
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGameRating = async (gBid) => {
  try {
    const response = await fetch(`${REACT_APP_SERVER_URL}/rating/${gBid}`);
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createGameRating = async (gBid, rating) => {
  try {
    const response = await fetch(`${REACT_APP_SERVER_URL}/rating`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gbGameId: gBid,
        ratings: [
          {
            rating: rating,
          },
        ],
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addGameRating = async (id, rating) => {
  try {
    const response = await fetch(`${REACT_APP_SERVER_URL}/rating/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
