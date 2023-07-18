import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import View from './Content/View';
import SpotifyCallback from './Content/SpotifyCallback';
import Playlists from './Content/Playlists';
import PlaylistV2 from './Content/PlaylistV2'
import Lobby from './Content/Lobby'
import Game from './Content/Game'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBtCzwh7m5ccvPESvdddE7Ou_BImAYc94",
  authDomain: "guessify-467fb.firebaseapp.com",
  projectId: "guessify-467fb",
  storageBucket: "guessify-467fb.appspot.com",
  messagingSenderId: "522010245735",
  appId: "1:522010245735:web:f5719ef895ab99d11ab2c2",
  measurementId: "G-KX4RGV7JSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <View />
        </Route>
        <Route exact path="/callback">
          <SpotifyCallback />
        </Route>
        <Route exact path="/playlistview">
          <PlaylistV2 />  
        </Route>
        <Route exact path="/playlists">
          <Playlists />
        </Route>
        <Route exact path="/lobby">
          <Lobby />
        </Route>
        <Route exact path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);