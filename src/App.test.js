import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './Components/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

afterEach(cleanup)

test('App component loads correctly', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const textElement = getByText(/Not Your Average Movies App/i);
  expect(textElement).toBeInTheDocument();
});

// test('verify Favourites link value', () => {
//   const { getByText } = render(<Provider store={store}><App /></Provider>);
//   expect(getByText('Favourites').href).toBe("http://localhost/favourites");
// });

// test('verify Favourites link value', () => {
//   const { getByText } = render(<Provider store={store}><App /></Provider>);
//   expect(getByText('Favourites').href).toBe("http://localhost/favourites");
// });