import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface TVMazeEpisode {
  season: number;
  number: number;
  airdate: string;
  name: string;
  rating: { average: number | null };
}

interface Episode {
  Episode: string;
  Released: string;
  Title: string;
  imdbRating: string;
}

async function fetchSeasonEpisodes(seasonId: string): Promise<Episode[]> {
  const { data } = await axios.get<TVMazeEpisode[]>('https://api.tvmaze.com/shows/491/episodes');
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

function EpisodeTable({ episodes }: { episodes: Episode[] }) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<keyof Episode | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key: keyof Episode) {
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
    if (sortKey !== null) {
      const key = sortKey;
      result = [...result].sort((a, b) => {
        const cmp = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true });
        return sortAsc ? cmp : -cmp;
      });
    }
    return result;
  }, [episodes, filter, sortKey, sortAsc]);

  return (
    <div style={{ paddingLeft: '10px' }}>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter by title..."
        style={{ marginBottom: '8px' }}
      />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '75%', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleSort('Title')}>
              <h4>Title {sortKey === 'Title' ? (sortAsc ? '▲' : '▼') : ''}</h4>
            </th>
            <th style={{ width: '25%', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleSort('imdbRating')}>
              <h4>Rating {sortKey === 'imdbRating' ? (sortAsc ? '▲' : '▼') : ''}</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={2} style={{ textAlign: 'center', color: '#fc8' }}>NO MATCHING EPISODES</td></tr>
            : rows.map((ep, i) => (
              <tr key={i}>
                <td>{ep.Title}</td>
                <td style={{ textAlign: 'center' }}>{ep.imdbRating}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

function Episodes() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { data: episodes = [], isError, isLoading } = useQuery({
    queryKey: ['episodes', seasonId],
    queryFn: () => fetchSeasonEpisodes(seasonId!),
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
      {isLoading
        ? <p style={{ color: '#fc8', marginLeft: '10px' }}>ACCESSING RECORDS...</p>
        : <EpisodeTable episodes={episodes} />}
    </div>
  );
}

export default Episodes;
