import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

interface TVMazeEpisode {
  season: number;
  number: number;
  airdate: string;
  name: string;
  rating: { average: number | null };
}

interface Episode {
  number: string;
  airdate: string;
  title: string;
  rating: string;
}

async function fetchAllEpisodes(): Promise<TVMazeEpisode[]> {
  const res = await fetch('https://api.tvmaze.com/shows/491/episodes');
  if (!res.ok) throw new Error(`TVMaze request failed: ${res.status}`);
  return res.json();
}

function toEpisode(ep: TVMazeEpisode): Episode {
  return {
    number: String(ep.number),
    airdate: ep.airdate,
    title: ep.name,
    rating: ep.rating.average !== null ? String(ep.rating.average) : 'N/A',
  };
}

function EpisodeTable({ episodes }: { episodes: Episode[] }) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<keyof Episode | null>('number');
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
      ? episodes.filter((ep) =>
          ep.title.toLowerCase().includes(filter.toLowerCase())
        )
      : episodes;
    if (sortKey !== null) {
      const key = sortKey;
      result = [...result].sort((a, b) => {
        const aVal = String(a[key]);
        const bVal = String(b[key]);
        if (aVal === 'N/A' && bVal === 'N/A') return 0;
        if (aVal === 'N/A') return 1;
        if (bVal === 'N/A') return -1;
        const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
        return sortAsc ? cmp : -cmp;
      });
    }
    return result;
  }, [episodes, filter, sortKey, sortAsc]);

  return (
    <div style={{ paddingLeft: '10px' }}>
      <input
        type="text"
        aria-label="Filter by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by title..."
        style={{ marginBottom: '8px' }}
      />
      <table>
        <thead>
          <tr>
            <th
              style={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              onClick={() => handleSort('number')}
            >
              <h4># {sortKey === 'number' ? (sortAsc ? '▲' : '▼') : ''}</h4>
            </th>
            <th
              style={{ cursor: 'pointer', padding: '0 8px' }}
              onClick={() => handleSort('title')}
            >
              <h4>Title {sortKey === 'title' ? (sortAsc ? '▲' : '▼') : ''}</h4>
            </th>
            <th
              style={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              onClick={() => handleSort('rating')}
            >
              <h4>
                Rating {sortKey === 'rating' ? (sortAsc ? '▲' : '▼') : ''}
              </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', color: '#fc8' }}>
                NO MATCHING EPISODES
              </td>
            </tr>
          ) : (
            rows.map((ep) => (
              <tr key={ep.number}>
                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {ep.number}
                </td>
                <td style={{ padding: '0 8px' }}>{ep.title}</td>
                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {ep.rating}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Episodes() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const season = parseInt(seasonId!, 10);

  const {
    data: allEpisodes,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchAllEpisodes,
  });

  const episodes = useMemo(
    () =>
      (allEpisodes ?? []).filter((ep) => ep.season === season).map(toEpisode),
    [allEpisodes, season]
  );

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
      {isLoading ? (
        <p style={{ color: '#fc8', marginLeft: '10px' }}>
          ACCESSING RECORDS...
        </p>
      ) : (
        <EpisodeTable episodes={episodes} />
      )}
    </div>
  );
}

export default Episodes;
