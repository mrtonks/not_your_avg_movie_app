import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {
  NavBar,
  Search,
  Favourites
} from './Components';
import Error from './Error';
import './App.css';

// import 'jquery';
// import 'bootstrap';

// window.$ = window.jQuery = require('jquery')

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Search} exact />
          <Route path="/favourites" component={Favourites} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
