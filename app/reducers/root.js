import { combineReducers } from 'redux';
import { imdbHasErrored, imdbIsLoading, imdb } from './imdb.js';

export default combineReducers({
  imdbHasErrored,
  imdbIsLoading,
  imdb
});
