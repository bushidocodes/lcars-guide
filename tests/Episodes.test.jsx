import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';
import Episodes from '../app/components/Episodes';
import rootReducer from '../app/reducers/root';
import { generateURL } from '../app/utils';

vi.mock('axios', () => ({
  default: { get: vi.fn(() => Promise.resolve({ data: [] })) },
}));

function makeStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

function renderEpisodes(seasonId = '4') {
  return render(
    <Provider store={makeStore()}>
      <MemoryRouter initialEntries={[`/seasons/${seasonId}`]}>
        <Routes>
          <Route path="/seasons/:seasonId" element={<Episodes />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('generateURL', () => {
  it('returns the TVMaze episodes endpoint for Star Trek TNG', () => {
    expect(generateURL()).toBe('https://api.tvmaze.com/shows/491/episodes');
  });
});

describe('<Episodes />', () => {
  it('renders the season heading after data loads', async () => {
    renderEpisodes('4');
    expect(await screen.findByText('Season 4')).toBeDefined();
  });

  it('renders the correct season heading for season 1', async () => {
    renderEpisodes('1');
    expect(await screen.findByText('Season 1')).toBeDefined();
  });
});
