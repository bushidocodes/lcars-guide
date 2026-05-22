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
    axios.get(generateURL())
      .then((response) => {
        dispatch(imdbIsLoading(false));
        return response;
      })
      .then((res) => {
        const season = parseInt(seasonId, 10);
        const episodes = res.data
          .filter(ep => ep.season === season)
          .map(ep => ({
            Episode: String(ep.number),
            Released: ep.airdate,
            Title: ep.name,
            imdbRating: ep.rating.average !== null ? String(ep.rating.average) : 'N/A',
          }));
        dispatch(receiveImdbData({
          Season: String(seasonId),
          Title: 'Star Trek: The Next Generation',
          totalSeasons: '7',
          Episodes: episodes,
        }));
      })
      .catch(() => dispatch(imdbHasErrored(true)));
  };
}

