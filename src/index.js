import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/playlist/:playlist_id" component={Main} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
