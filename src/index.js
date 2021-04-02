import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector} from 'react-redux'
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance  } from 'redux-firestore'
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
import { getFirestore } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import throttle from 'lodash/throttle';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore}))
  )
)

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  fbConfig
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance// <- needed if using firestore
}


const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) {
    return <div></div>
  }
  return children
}

  ReactDOM.render(
      < Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}> <AuthIsLoaded><App /></AuthIsLoaded></ReactReduxFirebaseProvider></Provider>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
