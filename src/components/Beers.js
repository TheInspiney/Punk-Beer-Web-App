import React from 'react';
import SearchForBeer from './SearchForBeer';
import RenderBeerList from './RenderBeerList';
import '../css/Beers.css';

const Beers = ({ beers, toggleFavourite, searchForBeer }) => {
  const beerList = beers.length ? (
    <RenderBeerList beers={beers} toggleFavourite={toggleFavourite} />
  ) : (
      <p className="info">...Loading Beer!</p>
    );

  return (
    <main className="App__main">
      <SearchForBeer searchForBeer={searchForBeer} />
      <div className="container">
        {beerList}
      </div>
    </main>
  );
}

export default Beers;