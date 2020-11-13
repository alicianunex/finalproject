const BASE_URL = 'https://www.giantbomb.com/api/games';

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
