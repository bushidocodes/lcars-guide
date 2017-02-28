import React from 'react';

export default (props) => {
  const episode = props.data;
  return (
    <tr>
      <td>{episode.Title}</td>
      <td>{episode.Released}</td>
      <td>{episode.Episode}</td>
      <td>{episode.imdbRating}</td>
      <td>{episode.imdbID}</td>
    </tr>
  );
};
