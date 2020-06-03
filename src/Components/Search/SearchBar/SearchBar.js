import React , { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  state = {
    searchQuery: ''
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13 && this.state.searchQuery) {
      this.handleSearchClick();
    }
  }

  handleSearchClick = () => {
    this.props.searchMovies(this.state.searchQuery);
  }

  render() {
    const handleFocus = this.props.handleFocus;
    const startSearch = this.props.startSearch;

    return (
      <div className="container">
          { startSearch ? (
              <div className="row">
                <div className="col mt-4 align-items-start">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={ this.state.searchQuery }
                      onChange={ this.handleChange }
                      onKeyDown={ this.handleKeyPress }
                      autoFocus
                    ></input>
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={ this.handleSearchClick }
                        disabled={ !this.state.searchQuery }
                      >Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row row-search-initial">
                <div className="col align-self-center">
                  <h3 className="my-4">Search a movie</h3>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control search-initial"
                    onFocus={ handleFocus }></input>
                </div>
              </div>
            )
          }
      </div>
    )
  }
}

export default SearchBar;