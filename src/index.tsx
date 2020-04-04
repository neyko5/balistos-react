import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    firebaseReducer,
    ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import { combineReducers, compose, createStore } from 'redux';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import App from './components/App/App';
import { firebase } from './config/firebase';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);
