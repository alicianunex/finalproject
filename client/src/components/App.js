import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import '../styles/index.css';
import Games from './home.js';

// pages
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
            <Route path="/" component={Games} />
            <Route path="/rating" component={Rating} />
            <Footer />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
