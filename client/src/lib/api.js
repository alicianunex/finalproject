const BASE_URL = 'https://www.giantbomb.com/api/games';

export const getAllGames = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?api_key=54e4c2ad8ea7f82809bebd61fa26d02b434b2898&format=json&filter=original_release_date:2017-07-01 |2018-12-31`,
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
      `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?api_key=54e4c2ad8ea7f82809bebd61fa26d02b434b2898&format=json&filter=id:${id}`,
    );
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createGame = async (game) => {
  const response = await fetch(`${BASE_URL}/games`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  });
  const newGame = await response.json();
  return newGame;
};
