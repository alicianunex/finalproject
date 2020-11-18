import React from 'react';
import {
  getGameById,
  getGameRating,
  createGameRating,
  addGameRating,
} from '../lib/api';

// This page used the 'Rating' component, a styled component that comes from the Material UI library,
// imported in the following line
import Rating from '@material-ui/lab/Rating';

class RatingPage extends React.Component {
  state = {
    game: [],
    ratingExists: false,
    gameId: '',
    gameRating: [],
    firstRating: 0,
    newRating: 0,
    ratingAverage: 0,
  };
  // Function to calculate the average rating of a game , and then set that average in state.
  //**(Could be improved, using a reduce() function instead of a for loop) */
  calculateRatingAverage = () => {
    const ratings = this.state.gameRating.ratings;
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      let ratingNum = ratings[i].rating;
      sum = sum + ratingNum;
    }
    // Line uses the toFixed method to make the rating average only ever be 1 decimal point long.
    let ratingAverage = (sum / ratings.length).toFixed(1);
    this.setState({ ratingAverage });
  };
  // Function to check if ratings already exist within the database and load them.
  loadRatings = async (gbId) => {
    try {
      const res = await getGameRating(gbId);
      // If getGameRating returns the below message
      //(i.e.the game doesn't exist yet in the database), this function returns nothing (null)
      if (res.message === 'Error: Rating resource not found.') {
        return null;
      } else {
        // If getGameRating does return rating(s),
        //load those ratings in state, and change the value of ratingExists within state to true.
        this.setState(
          { gameRating: res[0], ratingExists: true },
          this.calculateRatingAverage,
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  // On mount (the component loading), loads the specific game by making a request to the GiantBomb API.
  async componentDidMount() {
    try {
      const gameId = this.props.match.params.id;
      const res = await getGameById(gameId);
      this.setState(
        { game: res.results, gameId: res.results[0].id },
        async () => {
          try {
            await this.loadRatings(this.state.gameId);
          } catch (err) {
            console.log(err);
          }
        },
      );
      console.log(this.state);
    } catch (err) {}
  }
  // This is the function that is passed to 'Rating' component that renders the stars,
  //saving in state the value(number of stars) the user selects.
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // This is the function to create a new game/rating within the database,
  //and is passed to the < form > containing the < button > that the user clicks to submit the rating.
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // createGameRating recieves the games ID from the GB details, and the initial rating value
      await createGameRating(this.state.gameId, this.state.firstRating);
      await this.loadRatings(this.state.gameId);
    } catch (err) {
      console.log(err);
    }
  };

  // This is the function to add a rating to a game already within the database,
  // and is passed to the < form > containing the < button > that the user clicks to submit the rating.
  handleAddRating = async (event) => {
    event.preventDefault();
    try {
      // addGameRating takes the mongoDB _id of the game object, loaded in state from the initial call of loadRatings
      await addGameRating(this.state.gameRating._id, this.state.newRating);
      await this.loadRatings(this.state.gameId);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <div>
          <main id="games">
            <section className="boxrates">
              {/* This map is responsible for rendering the image and game, details loaded from the GiantBomb API */}
              {this.state.game.map((game) => (
                <article className="ratesbox">
                  <img
                    className="imagerates"
                    src={game.image.screen_url}
                    alt={game.name}
                  />
                  <h2 className="name">{game.name}</h2>
                </article>
              ))}
            </section>
            {/* This is a conditional render, which check the value of ratingExists in state, if that is false, it renders text to explain that a rating does not exist for that game, prompting user to submit the first review */}
            {this.state.ratingExists === false && (
              <h5 className="ratingpagedec">
                <p className="ratingtext">No rating exists for this game...</p>
                <form onSubmit={this.handleSubmit}>
                  <label>Give this game a rating</label>
                  <Rating
                    name="firstRating"
                    onChange={this.handleChange}
                    onClick={this.handleChange}
                  />
                  <button>Submit rating</button>
                </form>
              </h5>
            )}
            {/* The conditional render here is for if ratings already exist for that game. */}
            {this.state.ratingExists === true && (
              <>
                <p className="currentrating">
                  ⭐️Current Rating⭐️ {this.state.ratingAverage}
                </p>
                <h6 className="ratingpagedec">
                  <form onSubmit={this.handleAddRating}>
                    <label className="two">Rate this game</label>
                    <Rating
                      name="newRating"
                      onChange={this.handleChange}
                      onClick={this.handleChange}
                    />
                    <button>Submit rating</button>
                  </form>
                </h6>
              </>
            )}
          </main>
        </div>
      </>
    );
  }
}
export default RatingPage;
