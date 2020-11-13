const BASE_URL = 'https://api.igdb.com/v4';

export const getAllGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Client-ID': 'q6cc09e4hkzisjmef211tnb5ls0s1r',
        Authorization: 'Bearer s9vpgvoim6mva370w4kgadxyd76c0j',
      },
      body: JSON.stringify(),
    });
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
