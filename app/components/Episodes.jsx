import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Table, Thead, Th } from 'reactable';
import axios from 'axios';

async function fetchSeasonEpisodes(seasonId) {
  const { data } = await axios.get('https://api.tvmaze.com/shows/491/episodes');
  const season = parseInt(seasonId, 10);
  return data
    .filter(ep => ep.season === season)
    .map(ep => ({
      Episode: String(ep.number),
      Released: ep.airdate,
      Title: ep.name,
      imdbRating: ep.rating.average !== null ? String(ep.rating.average) : 'N/A',
    }));
}

function Episodes() {
  const { seasonId } = useParams();
  const { data: episodes = [], isError } = useQuery({
    queryKey: ['episodes', seasonId],
    queryFn: () => fetchSeasonEpisodes(seasonId),
  });

  if (isError) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'red' }}>RED ALERT</h1>
        <h4 style={{ textAlign: 'center', color: 'red' }}>ERROR DETECTED</h4>
      </div>
    );
  }

  return (
    <div>
      <h3>Season {seasonId}</h3>
      <Table className="table" data={episodes} sortable filterable={['Title']} style={{ width: '100%', marginLeft: '10px' }}>
        <Thead>
          <Th column="Title" style={{ width: '75%' }}><h4>Title</h4></Th>
          <Th column="imdbRating" style={{ width: '25%', textAlign: 'center' }}><h4>Rating</h4></Th>
        </Thead>
      </Table>
    </div>
  );
}

export default Episodes;
