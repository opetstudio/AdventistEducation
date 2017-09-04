import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
// import { createHashHistory } from 'history';
// import { routerMiddleware, routerActions } from 'react-router-redux';
import { routerActions } from 'react-router-redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import * as fetchDataActions from '../actions/fetchData';

// import type { dataReducerStateType } from '../reducers/dataReducer';

// export const history = createHashHistory();

const setupMiddleware = function () {
  return [thunk, createLogger({ level: 'info', collapsed: true })];
};

type counterStateType = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
};

const configureStore = (initialState?: counterStateType) => {
  // const initialState = {
  //   data: [],
  //   dataFetched: false,
  //   isFetching: false,
  //   error: false
  // };


  // Redux Configuration
  // Thunk Middleware
  // Logging Middleware
  const middleware = setupMiddleware();
  const enhancers = [];
  // Router Middleware
  // const router = routerMiddleware(history);
  // middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...fetchDataActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
    /* eslint-enable no-underscore-dangle */

    // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers, autoRehydrate());
  const store = createStore(rootReducer, initialState, enhancer);
  // const store = createStore(rootReducer);


  // const store = createStore(
  //     rootReducer,
  //     initialState,
  //     compose(
  //       applyMiddleware(
  //         thunk,
  //         logger
  //       ),
  //       autoRehydrate()
  //     )
  //   );

  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
  //   );
  // }

  // const store = createStore(rootReducer, initialState, compose(
  //   applyMiddleware(...middleware),
  //   autoRehydrate()
  // ));
  // console.dir(store);
  // persistStore(store);
  // return persistStore(createStore(rootReducer, initialState, enhancer));
  return store;
};

export { configureStore };


// export const configureStore = persistStore(theStore);
// export const configureStore = theStore;
