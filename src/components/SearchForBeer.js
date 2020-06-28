import React, { Component } from 'react';
import '../css/SearchForBeer.css';

class SearchForBeer extends Component {
  state = {
    content: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('searchInput').focus();
    if (!this.state.content) return;
    this.props.searchForBeer(this.state.content);
    this.setState({
      content: ''
    });
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input className="search-form__input" id="searchInput" type="search" placeholder="Search for beer..." onChange={this.handleChange} value={this.state.content} />
        <button className="search-form__button" type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForBeer;