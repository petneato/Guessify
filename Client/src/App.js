import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import * as React from 'react';

//Page/View imports -- These are in order of how the user will interract with them
import Login from './Pages/Login.js';
import Callback from './Pages/PostLogin.js';
import SelectPlaylist from './Pages/Playlists.js';
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';

import PlaylistRebuild from './Pages/PlaylistRebuild.js'

import './CSS/tailwind.css'


const App = () => {
    return (
        <Routes>
            <Route path="/"  element={<Login/>} />
            <Route path="/callback" element={<Callback/>} />
            <Route path="playlists" element={<SelectPlaylist/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/game" element={<Game/>}/>

            <Route path="/test" element={<PlaylistRebuild/>}/>
        </Routes>
    )
}

export default App