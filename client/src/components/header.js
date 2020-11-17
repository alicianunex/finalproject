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
      </nav>
    </header>
  );
};
export default Header;
