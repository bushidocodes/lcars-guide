import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import store from './store';

// Require LCARS CSS as CommonJS module
require('./style/lcars.css');

// Routes implemented as PlainRoutes due to react-router bug with HMR
// See https://github.com/reactjs/react-router-redux/issues/179
const routes = {
  path: '/',
  component: AppContainer,
  childRoutes: [
    { path: '/seasons/:seasonId', component: Episodes }
  ],
  indexRoute: { onEnter: (nextState, replace) => replace('seasons/4') }
};

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('main')
);

// Use WebPack HotModuleReloading if available
// Commented out pending bug between React-Router and HMR
// if (module.hot) {
  // module.hot.accept();
// }
