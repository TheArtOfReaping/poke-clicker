import {
  applyMiddleware,
  createStore,
  Middleware,
  combineReducers,
} from 'redux';

import { reducers } from '../reducers';
// import { Store } from 'react-redux';

export const storeReducers = combineReducers(reducers);
export const middlewares: Middleware[] = [];

export const store = createStore(
  storeReducers,
  applyMiddleware(...middlewares)
);
