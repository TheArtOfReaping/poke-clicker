import {
  applyMiddleware,
  createStore,
  Middleware,
  combineReducers,
  compose,
} from 'redux';

import { reducers } from '../reducers';
// import { Store } from 'react-redux';

export const storeReducers = combineReducers(reducers);
export const middlewares: Middleware[] = [];

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export const store = createStore(
  storeReducers,
  enhancer,
);
