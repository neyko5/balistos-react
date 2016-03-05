import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Home from './components/Home/Home.jsx';
import Main from './components/Main/Main.jsx';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

require("!style!css!less!./style/style.less");

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="playlist" component={Main} />
    </Route>
  </Router>
), document.getElementById('app'))