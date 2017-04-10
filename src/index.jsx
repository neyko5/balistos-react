import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import Home from './components/Home/Home';
import Main from './components/Main/Main';
import reducer from './reducers';
import rootSaga from './sagas';


import './style/style.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
);
export default store;

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="playlist/:playlist_id" component={Main} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
