import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import './style/lcars.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('main'));
root.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Navigate to="/seasons/4" replace />} />
          <Route path="seasons/:seasonId" element={<Episodes />} />
        </Route>
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);
