import React from 'react';
import { getAllGames } from '../lib/api';
import { Link } from 'react-router-dom';

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
      <>
        <div>
          <main id="games">
            <section className="container">
              {this.state.games.map((game) => (
                <Link to={`/rating/${game.id}`}>
                  <article className="gamebox">
                    <img className="image" src={game.image.screen_url} />
                    <h2 className="name">{game.name}</h2>
                    <p className="info">{game.deck}</p>
                  </article>
                </Link>
              ))}
            </section>
          </main>
        </div>
      </>
    );
  }
}
export default Games;
