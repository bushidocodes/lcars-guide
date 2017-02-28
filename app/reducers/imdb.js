import { RECEIVE_IMDB_DATA, IMDB_HAS_ERRORED, IMDB_IS_LOADING } from '../constants';

// Reducers
export const imdbHasErrored = (state = false, action) => {
  switch (action.type) {
    case IMDB_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
};

export const imdbIsLoading = (state = false, action) => {
  switch (action.type) {
    case IMDB_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
};

export const imdb = (state = {}, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_IMDB_DATA:
      newState = action.data;
      break;
    default:
      return state;
  }
  return newState;
};
