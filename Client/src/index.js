import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import View from './Content/View';
import SpotifyCallback from './Content/SpotifyCallback';
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
      </Switch>
      
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
