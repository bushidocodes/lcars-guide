import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Th } from 'reactable';
import { fetchImdbData } from '../actions/imdb';

function Episodes() {
  const { seasonId } = useParams();
  const dispatch = useDispatch();
  const imdb = useSelector(state => state.imdb);
  const hasErrored = useSelector(state => state.imdbHasErrored);

  useEffect(() => {
    dispatch(fetchImdbData(seasonId));
  }, [seasonId]);

  if (hasErrored) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'red' }}>RED ALERT</h1>
        <h4 style={{ textAlign: 'center', color: 'red' }}>ERROR DETECTED</h4>
      </div>
    );
  }

  const data = imdb.Episodes ? imdb : { Episodes: [] };
  return (
    <div>
      <h3>Season {data.Season}</h3>
      <Table className="table" data={data.Episodes} sortable filterable={['Title']} style={{ width: '100%', marginLeft: '10px' }}>
        <Thead>
          <Th column="Title" style={{ width: '75%' }}><h4>Title</h4></Th>
          <Th column="imdbRating" style={{ width: '25%', textAlign: 'center' }}><h4>Rating</h4></Th>
        </Thead>
      </Table>
    </div>
  );
}

export default Episodes;
