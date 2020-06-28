import React from 'react';

const RenderBeerList = props => (
  props.beers.map(beer => (
    <div className="card" key={beer.id}>
      <div className="card__col">
        <img className="card__img" src={beer.imageURL} alt={beer.name} />
        <p className="card__text card__text--sm">First brewed: {beer.firstBrewed}</p>
      </div>
      <div className="card__content">
        <h2 className="card__title">{beer.name}</h2>
        <p className="card__text card__text--gray">{beer.tagline}</p>
        <p className="card__text">{beer.desc}</p>
      </div>
      <i className={beer.isFavourite ? 'fas fa-star' : 'far fa-star'} title={beer.isFavourite ? 'Remove from Favourites' : 'Add to Favourites'} onClick={(e) => props.toggleFavourite(e, beer.id)} ></i>
    </div>
  ))
)

export default RenderBeerList;