import axios from 'axios';
import { RECEIVE_IMDB_DATA, IMDB_HAS_ERRORED, IMDB_IS_LOADING } from '../constants';
import { generateURL } from '../utils';

// Action Creators
export const imdbHasErrored = bool => ({
  type: IMDB_HAS_ERRORED,
  hasErrored: bool
});
export const imdbIsLoading = bool => ({
  type: IMDB_IS_LOADING,
  isLoading: bool
});
export const receiveImdbData = data => ({
  type: RECEIVE_IMDB_DATA,
  data
});

// Thunks
export function fetchImdbData(seasonId) {
  return (dispatch) => {
    dispatch(imdbIsLoading(true));
    const targetUrl = generateURL(seasonId);
    axios.get(targetUrl)
      .then((response) => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }
        dispatch(imdbIsLoading(false));
        return response;
      })
      .then(res => dispatch(receiveImdbData(res.data)))
      .catch(() => dispatch(imdbHasErrored(true)));
  };
}

