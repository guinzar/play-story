import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'chartjs-plugin-datalabels';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import logInReducer from './store/reducers/logIn';
import signUpReducer from './store/reducers/signUp';
import homeReducer from './store/reducers/home';
import userReducer from './store/reducers/user';
import gamesReducer from './store/reducers/games';
import addGameReducer from './store/reducers/addGame';
import timelineReducer from './store/reducers/timeline';
import { watchSearchGames } from "./store/sagas";

const composeEnhancers =
  process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose : compose;
const rootReducer = combineReducers({
  auth: authReducer,
  logIn: logInReducer,
  signUp: signUpReducer,
  home: homeReducer,
  user: userReducer,
  games: gamesReducer,
  addGame: addGameReducer,
  timeline: timelineReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchSearchGames);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
