import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from './SearchActions';
import SearchBar from './SearchBar';
import ResultsTable from './ResultsTable';

class Search extends Component {
  state = {
    startSearch: false
  };

  handleFocus = () => {
    this.setState({ startSearch: true });
  }

  searchMovies = (query) => {
    this.props.fetchData(query);
  }

  render() {
    const results = this.props.results;
    console.log('results', results);

    return (
      <Fragment>
        <SearchBar startSearch={this.state.startSearch} handleFocus={this.handleFocus} searchMovies={this.searchMovies} />
        <br />
        <ResultsTable
          startSearch={this.state.startSearch}
          results={results} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: {
      movies: state.movies.items,
      loading: state.movies.loading,
      error: state.movies.error,
      totalFound: state.movies.totalFound
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (query) => dispatch(fetchMovies(query))
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(Search)