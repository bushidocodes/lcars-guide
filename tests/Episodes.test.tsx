import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Episodes from '../app/components/Episodes';

const MOCK_EPISODES = [
  { season: 3, number: 1, airdate: '1989-09-25', name: 'Evolution', rating: { average: 7.4 } },
  { season: 4, number: 1, airdate: '1990-09-24', name: 'The Best of Both Worlds, Part II', rating: { average: 9.1 } },
  { season: 4, number: 2, airdate: '1990-10-01', name: 'Family', rating: { average: 8.5 } },
  { season: 4, number: 3, airdate: '1990-10-08', name: 'Brothers', rating: { average: 8.2 } },
  { season: 4, number: 4, airdate: '1990-10-15', name: 'Suddenly Human', rating: { average: null } },
  { season: 5, number: 1, airdate: '1991-09-23', name: 'Redemption II', rating: { average: 8.0 } },
];

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}));

function renderEpisodes(seasonId = '4') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/seasons/${seasonId}`]}>
        <Routes>
          <Route path="/seasons/:seasonId" element={<Episodes />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.mocked(axios.get).mockResolvedValue({ data: MOCK_EPISODES });
});

describe('<Episodes />', () => {
  it('renders the season heading', () => {
    renderEpisodes('4');
    expect(screen.getByText('Season 4')).toBeInTheDocument();
  });

  it('shows only episodes for the requested season', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('The Best of Both Worlds, Part II')).toBeInTheDocument());
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.getByText('Brothers')).toBeInTheDocument();
    expect(screen.queryByText('Evolution')).not.toBeInTheDocument();
    expect(screen.queryByText('Redemption II')).not.toBeInTheDocument();
  });

  it('filters episodes by title (case-insensitive)', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('Family')).toBeInTheDocument());

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'family' } });

    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.queryByText('Brothers')).not.toBeInTheDocument();
    expect(screen.queryByText('The Best of Both Worlds, Part II')).not.toBeInTheDocument();
  });

  it('clears filter to show all season episodes again', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('Brothers')).toBeInTheDocument());

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'brothers' } });
    expect(screen.queryByText('Family')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.getByText('Brothers')).toBeInTheDocument();
  });

  it('sorts by rating ascending then descending on header click', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('Brothers')).toBeInTheDocument());

    const ratingHeader = screen.getByText('Rating').closest('th')!;

    fireEvent.click(ratingHeader);
    const ascRows = screen.getAllByRole('row').slice(1);
    expect(ascRows[0]).toHaveTextContent('Brothers'); // 8.2 lowest

    fireEvent.click(ratingHeader);
    const descRows = screen.getAllByRole('row').slice(1);
    expect(descRows[0]).toHaveTextContent('The Best of Both Worlds, Part II'); // 9.1 highest
  });

  it('sorts by title alphabetically on header click', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('Family')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Title').closest('th')!);
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('Brothers');
    expect(rows[1]).toHaveTextContent('Family');
    expect(rows[2]).toHaveTextContent('Suddenly Human');
    expect(rows[3]).toHaveTextContent('The Best of Both Worlds, Part II');
  });

  it('sorts N/A ratings to the bottom in both ascending and descending order', async () => {
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('Brothers')).toBeInTheDocument());

    const ratingHeader = screen.getByText('Rating').closest('th')!;

    // ascending: lowest rated first, N/A last
    fireEvent.click(ratingHeader);
    let rows = screen.getAllByRole('row').slice(1);
    expect(rows[rows.length - 1]).toHaveTextContent('Suddenly Human');

    // descending: highest rated first, N/A still last
    fireEvent.click(ratingHeader);
    rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent('The Best of Both Worlds, Part II');
    expect(rows[rows.length - 1]).toHaveTextContent('Suddenly Human');
  });

  it('shows RED ALERT when the API call fails', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));
    renderEpisodes('4');
    await waitFor(() => expect(screen.getByText('RED ALERT')).toBeInTheDocument());
    expect(screen.getByText('ERROR DETECTED')).toBeInTheDocument();
  });
});
