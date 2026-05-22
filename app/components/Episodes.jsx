import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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

function EpisodeTable({ episodes }) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const rows = useMemo(() => {
    let result = filter
      ? episodes.filter(ep => ep.Title.toLowerCase().includes(filter.toLowerCase()))
      : episodes;
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
        return sortAsc ? cmp : -cmp;
      });
    }
    return result;
  }, [episodes, filter, sortKey, sortAsc]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <table style={{ width: '100%', marginLeft: '10px' }}>
        <thead>
          <tr>
            <th style={{ width: '75%', cursor: 'pointer' }} onClick={() => handleSort('Title')}>
              <h4>Title</h4>
            </th>
            <th style={{ width: '25%', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleSort('imdbRating')}>
              <h4>Rating</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((ep, i) => (
            <tr key={i}>
              <td>{ep.Title}</td>
              <td style={{ textAlign: 'center' }}>{ep.imdbRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
      <EpisodeTable episodes={episodes} />
    </div>
  );
}

export default Episodes;
