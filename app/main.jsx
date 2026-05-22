import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import Episodes from './components/Episodes';
import store from './store';

require('./style/lcars.css');

render(
  <Provider store={store}>
    <HashRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/seasons/4" replace />} />
          <Route path="/seasons/:seasonId" component={Episodes} />
        </Switch>
      </AppContainer>
    </HashRouter>
  </Provider>,
  document.getElementById('main')
);
