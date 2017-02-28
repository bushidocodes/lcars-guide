import { RECEIVE_IMDB_DATA, IMDB_HAS_ERRORED, IMDB_IS_LOADING } from '../constants';

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
    const targetUrl = `http://www.omdbapi.com/?i=tt0092455&season=${seasonId}&ref_=tt_eps_sn_${seasonId}`;
    fetch(targetUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(imdbIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(receiveImdbData(data)))
      .catch(() => dispatch(imdbHasErrored(true)));
  };
}
