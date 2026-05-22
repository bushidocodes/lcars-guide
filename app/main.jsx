import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import store from './store';

require('./style/lcars.css');

const root = createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Navigate to="/seasons/4" replace />} />
          <Route path="seasons/:seasonId" element={<Episodes />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
