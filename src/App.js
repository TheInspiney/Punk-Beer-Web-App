import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Beers from "./components/Beers";
import Favourites from "./components/Favourites";
import Login from "./components/Login.js";

class App extends Component {
  state = {
    items: [],
    favourites: localStorage.getItem("Favourites")
      ? JSON.parse(localStorage.getItem("Favourites"))
      : [],
    isLoaded: false,
    error: null
  };

  toggleFavourite = async (e, id) => {
    const beer = this.state.items.find(item => item.id === id);
    let favourites;
    if (!beer.isFavourite) {
      e.target.className = "fas fa-star";
      e.target.setAttribute("title", "Remove from Favourites");
      favourites = [...this.state.favourites, beer];
    } else {
      e.target.className = "far fa-star";
      e.target.setAttribute("title", "Add to Favourites");
      favourites = this.state.favourites.filter(
        favourite => favourite.id !== id
      );
    }
    beer.isFavourite = !beer.isFavourite;
    await this.setState({ favourites });
    localStorage.setItem("Favourites", JSON.stringify(this.state.favourites));
  };

  checkIfFavourite = id => {
    const isFavourite = this.state.favourites.find(
      favourite => favourite.id === id
    );
    if (isFavourite) return true;
    return false;
  };

  searchForBeer = beer => {
    const items = [];
    fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${beer}&page=1&per_page=80`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The connection ended with status ${res.status}${
              res.statusText ? ": " + res.statusText : ""
            }`
          );
        }
      })
      .then(json => {
        if (!json.length)
          return alert("We're sorry, we could not find such a beer :(");
        json.forEach(item => {
          const beer = {
            id: item.id,
            name: item.name,
            tagline: item.tagline,
            firstBrewed: item.first_brewed,
            desc: item.description,
            imageURL: item.image_url,
            isFavourite: this.checkIfFavourite(item.id)
          };
          items.push(beer);
        });
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ error });
        alert(error);
      });
  };

  componentDidMount() {
    const items = [];
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80")
      .then(res => {
        if (res.ok) {
          this.setState({ isLoaded: true });
          return res.json();
        } else {
          throw new Error(
            `The connection ended with status ${res.status}${
              res.statusText ? ": " + res.statusText : ""
            }`
          );
        }
      })
      .then(json => {
        json.forEach(item => {
          const beer = {
            id: item.id,
            name: item.name,
            tagline: item.tagline,
            firstBrewed: item.first_brewed,
            desc: item.description,
            imageURL: item.image_url,
            isFavourite: this.checkIfFavourite(item.id)
          };
          items.push(beer);
        });
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
        alert(error);
      });
  }

  render() {
    const { items, favourites } = this.state;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/Beers"
              render={() => (
                <Beers
                  beers={items}
                  toggleFavourite={this.toggleFavourite}
                  searchForBeer={this.searchForBeer}
                />
              )}
            />
            <Route exact path="/" render={() => <Login />} />
            <Route
              path="/favourites"
              render={() => (
                <Favourites
                  beers={favourites}
                  toggleFavourite={this.toggleFavourite}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
