import React , { Component } from 'react';
import Modal from '../Modal';
import './Favourites.css';

class Favourites extends Component {
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

  removeFavourite = (id) => {
    const value = this.state.favourites.filter(f => f.id !== id)
    localStorage.setItem('favMovies', JSON.stringify(value));
    this.setState({ favourites: value });
  }

  showModal = (movie) => {
    this.setState({ view: { showModal: true, movie: movie } });
    console.log(this.state.view.showModal);
  }

  hideModal = () => {
    this.setState({ view: {showModal: false} });
  }

  render() {
    if (!this.state.favourites || !this.state.favourites.length) {
      return <h5 className="mt-5">You don't have any favourite movies!</h5>
    }

    return (
      <div className="container">
        <h3 className="my-4">Favourite movies</h3>
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
            {this.state.favourites.map((movie, idx) =>
              <tr key={movie.id}>
                <td>
                  <i
                    id="star-icon"
                    title="Remove"
                    className={`fa fa-2x ${~this.state.favourites.findIndex(f => f.id === movie.id) ? 'fa-star' : 'fa-star-o'}`}
                    onClick={() => this.removeFavourite(movie.id)}>
                  </i>
                </td>
                <td
                  title={movie.poster_path ? '': 'No poster available'}
                  onClick={() => movie.poster_path ? this.showModal(movie) : alert('No poster available.')}
                  style={{cursor: 'pointer', textAlign: 'left'}}
                >
                  {movie.title}
                </td>
                <td>{movie.release_date}</td>
                <td>{movie.vote_average}/10</td>
              </tr>
            )}
          </tbody>
        </table>
        {this.state.view.showModal ? <Modal hideModal={this.hideModal} movie={this.state.view.movie}/> : null}
      </div>
    );
  }
}

export default Favourites;