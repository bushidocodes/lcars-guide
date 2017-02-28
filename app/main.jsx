import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Episodes from './components/Episodes';
import store from './store';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} >
        <IndexRoute component={Episodes} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
