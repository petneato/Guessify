import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import View from './Content/View';
import SpotifyCallback from './Content/SpotifyCallback';
import Playlists from './Content/Playlists';
import PlaylistV2 from './Content/PlaylistV2'
import Lobby from './Content/Lobby'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
      </Switch>
    </Router>
  </React.StrictMode>
);