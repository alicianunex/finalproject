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
      this.setState({ games: res });
      console.log(res);
    } catch (err) {}
  }
  render() {
    return (
      <div>
        {/* <div className="box2">
          {this.state.games.map((game) => (
            <div>
              <h1 className="ginfo">{game.name}</h1>
              {/* <h2 className="ginfo">{game.age}</h2>
              <h3 className="ginfo">{game.company}</h3>
              <h4 className="ginfo">{game.genre}</h4>
              <h5 className="ginfo">{game.plataform}</h5> */}
        {/* <img alt={game.name} className="gamephoto" src={game.image} /> */}
        {/* </div>
          ))}
        </div>  */}
      </div>
    );
  }
}
export default Games;
