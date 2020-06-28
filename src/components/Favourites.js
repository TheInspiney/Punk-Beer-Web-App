import React from 'react';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Favourites = ({ beers, toggleFavourite }) => {
  const beerList = beers.length ? (
    <RenderBeerList beers={beers} toggleFavourite={toggleFavourite} />
  ) : (
      <p className="info">You have not added any beers to your Favourites yet!</p>
    );

  return (
    <div className="container">
      {beerList}
    </div>
  );
}

export default Favourites;