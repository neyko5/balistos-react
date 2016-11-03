import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Home from './components/Home/Home.jsx';
import Main from './components/Main/Main.jsx';
import reducer from './reducers'
import rootSaga from './sagas'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

require("!style!css!less!./style/style.less");

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}></Route>
            <Route path="playlist/:playlist_id" component={Main} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
