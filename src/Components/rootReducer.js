import { combineReducers } from 'redux';
import movieReducer from './Search/SearchReducer';

export default combineReducers({
  movies: movieReducer
});