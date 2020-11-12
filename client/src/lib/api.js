const BASE_URL = 'https://api.igdb.com/v4/games';

const PARAMS = '&limit=1&offset=0&rating';

export const getAllGame = async () => {
  try {
    const response = await fetch(`${BASE_URL}&q=${query}${PARAMS}/games`);
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
