import React from 'react';
import ReactDOM from 'react-dom';
import RouterWeb from './RouterWeb';

const content = document.getElementById('root');

ReactDOM.render((
  <RouterWeb />
), content);

// ReactDOM.render((
//   <HashRouter>
//     <Route path="/" component={Home} />
//     <Route path="/about" component={About} />
//   </HashRouter>
// ), content);
