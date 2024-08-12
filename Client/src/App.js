import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import * as React from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

//Page/View imports -- These are in order of how the user will interract with them
import LandingPage from './Pages/LandingPage.js';
import Callback from './Pages/PostLogin.js';
import PlaylistRebuild from "./Pages/PlaylistRebuild.js";
import SelectPlaylist from './Pages/Playlists.js';
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';

import NavBar from "./Components/NavBar.js";


import './CSS/tailwind.css'


const App = () => {
    return (
        <RecoilRoot>
            <div className="h-[100vh] flex flex-col">
                <NavBar />
                <div className="flex-grow overflow-hidden">
                    <Routes>
                        <Route path="/"  element={<LandingPage/>} />
                        <Route path="/callback" element={<Callback/>} />
                        <Route path="/test" element={<SelectPlaylist/>}/>
                        <Route path="/lobby" element={<Lobby/>}/>
                        <Route path="/game" element={<Game/>}/>

                        <Route path="/playlists" element={<PlaylistRebuild/>}/>
                    </Routes>
                </div>
        </div>
        </RecoilRoot>
    )
}

export default App;
