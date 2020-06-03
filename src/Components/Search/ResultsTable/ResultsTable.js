import React, { Component } from 'react';
import Modal from '../../Modal';
import './ResultsTable.css';

class ResultsTable extends Component {
  state = {
    favourites: [],
    view: {
      showModal: false,
      movie: {}
    }
  }

  componentDidMount = () => {
    this.setState({ favourites: JSON.parse(localStorage.getItem('favMovies')) || [] })
  }

  addFavourite = (movie) => {
    try {
      let value = JSON.parse(localStorage.getItem('favMovies'));

      if (value !== null) {
        if (value.map(movie => movie.id).includes(movie.id)) {
          value = value.filter(v => v.id !== movie.id);
        } else {
          value.push(movie);
        }
      } else {
        value = [movie];
      }

      localStorage.setItem('favMovies', JSON.stringify(value));
      this.setState({ favourites: value });
    } catch (error) {
      console.log('Error in addToFavourites:', error);
      alert('Error when adding the movie to your favourites list.');
    }
  }

  showModal = (movie) => {
    this.setState({ view: { showModal: true, movie: movie } });
    console.log(this.state.view.showModal);
  }

  hideModal = () => {
    this.setState({ view: {showModal: false} });
  }

  render() {
    const { error, loading, movies, totalFound } = this.props.results;
    const startSearch = this.props.startSearch;

    if (startSearch) {
      if (error) {
        return <div>Error! {error.message}</div>;
      }

      if (loading) {
        return (
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
      }

      if (movies === undefined || totalFound === undefined) {
        return null;
      }

      if (totalFound === 0) {
        return <div>No movies found! Modify your query.</div>
      }

      return (
        <div className="container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{width: '5%'}}></th>
                <th scope="col" style={{textAlign: 'left'}}>Name</th>
                <th scope="col">Release Date</th>
                <th scope="col">Popularity</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, idx) =>
                <tr key={movie.id}>
                  <td>
                    <i
                      id="star-icon"
                      title="Add to favourites"
                      className={`fa fa-2x ${~this.state.favourites.findIndex(f => f.id === movie.id) ? 'fa-star' : 'fa-star-o'}`}
                      onClick={() => this.addFavourite(movie)}
                    ></i>
                  </td>
                  <td
                    title={movie.poster_path ? '': 'No poster available'}
                    onClick={() => movie.poster_path ? this.showModal(movie) : alert('No poster available.')}
                    style={{cursor: 'pointer', textAlign: 'left'}}
                  >
                    {movie.title}
                  </td>
                  <td>{movie.release_date || 'No date'}</td>
                  <td>{movie.vote_average > 0 ? movie.vote_average + '/10' : 'No rate'}</td>
                </tr>
              )}
            </tbody>
          </table>
          {this.state.view.showModal ? <Modal hideModal={this.hideModal} movie={this.state.view.movie}/> : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ResultsTable;