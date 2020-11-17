import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>VIDEOGAMES RATES</h1>
      <nav>
        <Link to="/" id="one">
          INDEX
        </Link>
        {/* <button type="submit" class="reload">
          Next Game
        </button> */}
      </nav>
    </header>
  );
};
export default Header;
