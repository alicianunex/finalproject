import React from 'react';
import { getAllGames } from '../lib/api';
class Games extends React.Component {
  state = {
    games: [],
    clicked: false,
  };
  onclicked = () => {
    this.setState({ clicked: true });
    console.log('helloitsme');
  };
  async componentDidMount() {
    try {
      const res = await getAllGames();
      this.setState({ games: res.results }, console.log(this.state.games));
      console.log(res);
    } catch (err) {}
  }
  render() {
    return (
      <div>
        {this.state.games.map((game) => (
          <div>
            <p>{game.name}</p>
            <p>{game.deck}</p>
            <img src={game.image.screen_url} />
          </div>
        ))}
      </div>
    );
  }
}
export default Games;
