import React from 'react';
import { getGameById, getGameRating, createGameRating, addGameRating } from '../lib/api';
import Rating from '@material-ui/lab/Rating';


class RatingPage extends React.Component {
  state = {
    game: [],
    ratingExists: false,
    gameId: '',
    gameRating: [],
    firstRating: 0,
    newRating: 0,
    ratingAverage: 0
  };

  calculateRatingAverage = () => {
    const ratings = this.state.gameRating.ratings
    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
      let ratingNum = ratings[i].rating
      sum = sum + ratingNum
    }
    let ratingAverage = (sum / ratings.length).toFixed(1)
    this.setState({ ratingAverage })
  }

  loadRatings = async (gbId) => {
    try {
      const res = await getGameRating(gbId)
      if (res.message === 'Error: Rating resource not found.') {
        return null
      } else {
        this.setState({ gameRating: res[0], ratingExists: true }, this.calculateRatingAverage)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    try {
      const gameId = this.props.match.params.id
      const res = await getGameById(gameId);
      this.setState({ game: res.results, gameId: res.results[0].id }, async () => {
        try {
          await this.loadRatings(this.state.gameId)
        } catch (err) {
          console.log(err)
        }
      });
      console.log(this.state);
    } catch (err) {}
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await createGameRating(this.state.gameId, this.state.firstRating)
      await this.loadRatings(this.state.gameId)
    } catch (err) {
      console.log(err)
    }
  }

  handleAddRating = async event => {
    event.preventDefault()
    try {
      await addGameRating(this.state.gameRating._id, this.state.newRating)
      await this.loadRatings(this.state.gameId)
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    return (
      <>
        <div>
          <main id="games">
            <section className="container">
              {this.state.game.map((game) => (
                <article className="gamebox">
                  <img className="image" src={game.image.screen_url} alt={game.name}/>
                  <h2 className="name">{game.name}</h2>
                  <p className="info">{game.deck}</p>
                </article>
              ))}
            </section>
            {this.state.ratingExists === false &&
            <>
            <p>No rating exists for this game...</p>
            <form onSubmit={this.handleSubmit}>
              <label>Give this game a rating</label>
              <Rating
          name="firstRating"
          onChange={this.handleChange}
          onClick={this.handleChange}
        />
              <button>Submit the rating</button>
            </form>
            </>
            }
            {this.state.ratingExists === true &&
            <>
            <p>Current Rating: {this.state.ratingAverage}</p>
            <form onSubmit={this.handleAddRating}>
            <label>Rate this game</label>
            <Rating
          name="newRating"
          onChange={this.handleChange}
          onClick={this.handleChange}
        />
            <button>Submit the rating</button>
            </form>
            </>
            }
            
          </main>
        </div>
      </>
    );
  }
}
export default RatingPage;