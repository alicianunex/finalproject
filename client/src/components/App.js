import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import '../styles/App.css';

// pages
import Home from '../pages/home';
import Rating from '../pages/rating.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route path="/rating" component={Rating} /> */}
          <Footer></Footer>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
