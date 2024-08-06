import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import * as React from 'react';

//Page/View imports -- These are in order of how the user will interract with them
import Login from './Pages/Login';
import Callback from './Pages/PostLogin';
import SelectPlaylist from './Pages/PlaylistV2';
import Lobby from './Pages/Lobby';
import Game from './Pages/Game';



const App = () => {
    return (
        <Routes>
            {/* Login.js */}
            <Route path="/"  element={<Login/>} />
            <Route path="/callback" element={<Callback/>} />
            <Route path="playlists" element={SelectPlaylist}/>
            {/* <Route path="" element={}/>
            <Route path="" element={}/>
            <Route path="" element={}/>
            <Route path="" element={}/> */}
        </Routes>
    )
}

export default App