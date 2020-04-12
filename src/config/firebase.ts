import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID,
    appId: process.env.REACT_APP_APPID,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const firestore = firebase.firestore();
if (process.env.NODE_ENV !== 'test') {
    firestore.enablePersistence({ synchronizeTabs: true });
}

export { firestore, firebase };
