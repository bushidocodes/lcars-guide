import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk as thunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers/root';

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);
