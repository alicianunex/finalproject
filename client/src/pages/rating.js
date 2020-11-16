import React from 'react';
import { getGameById } from '../lib/api';


class Rating extends React.Component {
  state = {
    game: [],
    clicked: false,
    gameId: ''
  };

  async componentDidMount() {
    try {
      const gameId = this.props.match.params.id
      const res = await getGameById(gameId);
      this.setState({ game: res.results });
      console.log(res);
    } catch (err) {}
  }
  render() {
    return (
      <>
        <div>
          <main id="games">
            <section className="container">
              {this.state.game.map((game) => (
                <article className="gamebox">
                  <img className="image" src={game.image.screen_url} />
                  <h2 className="name">{game.name}</h2>
                  <p className="info">{game.deck}</p>
                </article>
              ))}
            </section>
          </main>
        </div>
      </>
    );
  }
}
export default Rating;