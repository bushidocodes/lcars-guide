import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import store from './store';

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer} >
        <Route path="seasons/:seasonId" component={Episodes} />
        <IndexRedirect to="seasons/4" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
