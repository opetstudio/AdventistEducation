import React, { Component } from 'react';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// import { ConnectedRouter } from 'react-router-redux';
import { configureStore } from './store/configureStore';
// import CounterPage from './pages/counter/Counter';

import LoginPage from './pages/Login';
import SplashPage from './pages/Splash';
import AdminPage from './pages/Admin';
import AbsendigitalPage from './pages/Absendigital';
import AbsenPage from './pages/Absen';

const store = configureStore();
persistStore(store);

console.log('store state===>', store.getState());

class RouterWeb extends Component {
  render() {
    return (
      <Provider store={store}>
          <HashRouter>
            <div>
              {/* <Route path="/" component={Home} /> */}
              <Route exact path="/" component={SplashPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/absendigital" component={AbsendigitalPage} />
              <Route path="/absen" component={AbsenPage} />
            </div>
         </HashRouter>
     </Provider>
    );
  }
}

export default RouterWeb;
