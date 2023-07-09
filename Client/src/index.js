import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import View from './Content/View'
import App from './Content/App'
import SpotifyCallback from './Content/SpotifyCallback'
import PlaylistV2 from './Content/PlaylistV2'
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);