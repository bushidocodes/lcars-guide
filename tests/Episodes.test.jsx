import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Episodes from '../app/components/Episodes';

vi.mock('axios', () => ({
  default: { get: vi.fn(() => Promise.resolve({ data: [] })) },
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

describe('<Episodes />', () => {
  it('renders the season heading for season 4', () => {
    renderEpisodes('4');
    expect(screen.getByText('Season 4')).toBeDefined();
  });

  it('renders the season heading for season 1', () => {
    renderEpisodes('1');
    expect(screen.getByText('Season 1')).toBeDefined();
  });
});
