import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import '../styles/index.css';

// pages
import Games from './home.js';
import Rating from '../pages/rating.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <section className="container2">
            <Header />
          </section>
          <Switch>
            <Route exact path="/" component={Games} />
            <Route path="/rating/:id" component={Rating} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
