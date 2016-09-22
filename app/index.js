import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Home from './components/Home/Home.jsx';
import Main from './components/Main/Main.jsx';
import balistosApp from './reducers'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

require("!style!css!less!./style/style.less");

let store = createStore(
    balistosApp,
    applyMiddleware(
        thunkMiddleware
    )
)

store.subscribe(function(){
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}></Route>
            <Route path="playlist/:playlist_id" component={Main} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
