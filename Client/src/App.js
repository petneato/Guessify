import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

//Page/View imports -- These are in order of how the user will interract with them
import LandingPage from './Pages/LandingPage.js';
import PlaylistSelect from "./Pages/PlaylistSelect.js";
import Lobby from './Pages/Lobby.js';
import Game from './Pages/Game.js';

import NavBar from "./Components/NavBar.js";


import './CSS/tailwind.css'


const App = () => {
    const [accessToken, setAccessToken] = useState(window.localStorage.getItem('access_token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setAccessToken(window.localStorage.getItem('access_token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <RecoilRoot>
            <div className="h-[100vh] flex flex-col">
                <NavBar key={accessToken} />
                <div className="flex-grow overflow-hidden">
                    <Routes>
                        <Route path="/"  element={<LandingPage/>} />
                        <Route path="/playlists" element={<PlaylistSelect/>}/>
                        <Route path="/lobby" element={<Lobby/>}/>
                        <Route path="/game" element={<Game/>}/>
                    </Routes>
                </div>
        </div>
        </RecoilRoot>
    )
}

export default App;