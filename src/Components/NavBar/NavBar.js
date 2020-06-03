import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../../src/logo.svg';
import './NavBar.css';

class NavBar extends Component {
  state = {
    collapse: false,
    location: this.props.location.pathname
  }

  collapseNavBar = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    console.log(this.state.location);

    return (
      <nav className="navbar sticky-top navbar-expand-md navbar-light">
        <div className="w-100 position-relative d-flex">
          <img src={logo} className="App-logo align-self-center mr-1" alt="logo" />
          <a className="navbar-brand" href="/">Not Your Average Movies App</a>
          <button className="navbar-toggler position-absolute align-self-center" style={{right: 0}} type="button" onClick={this.collapseNavBar}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        { this.state.collapse ? (
          <div>
            <div className="navbar-nav text-left">
              <a className={`nav-item nav-link ${this.state.location === '/' ? 'active' : ''}`} href="/">Home <span className="sr-only">(current)</span></a>
              <a className={`nav-item nav-link ${this.state.location === '/favourites' ? 'active' : ''}`} href="/favourites">Favourites</a>
            </div>
          </div>
          ) : (
          <div className="collapse navbar-collapse" id="navBarFull">
            <div className="navbar-nav">
              <a className={`nav-item nav-link ${this.state.location === '/' ? 'active' : ''}`} href="/">Home <span className="sr-only">(current)</span></a>
              <a className={`nav-item nav-link ${this.state.location === '/favourites' ? 'active' : ''}`} href="/favourites">Favourites</a>
            </div>
          </div>
          )
        }
      </nav>
    )
  }
}

export default withRouter(NavBar);