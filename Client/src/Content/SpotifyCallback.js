import {loginPKCE, getProfile, getLoginToken, getPlaylist} from './Spotify.js'
import '../CSS/View.css';
import logo from '../Images/Spotify.png';
import { useState, useEffect } from "react";

function SpotifyCallback(){

    let [user, setUser] = useState("");
    let [token, setToken] = useState("");

    let goPlay = () => {
        window.open("http://localhost:3000/playlists","_self")
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        
        window.localStorage.setItem("userCode", code);

        let codeVerifier = window.localStorage.getItem('codeVerifier');

        getLoginToken(code, codeVerifier);

        let accessToken = window.localStorage.getItem('access_token');
        setToken(accessToken);

    }, [])

    useEffect(() => {
        
        (async () => {
            if(token != ""){
                setUser(await getProfile(token));
            }
        })();

    }, [token])

    let image;
    
    try {
        image = user.images[0].url;
    } catch {
        image = logo
    }

    return(
        <div className="Super">
        <header className="App-header">
          <img src={image} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>Welcome {user.display_name}!</h4>
          <button onClick={goPlay} >playlist veiwer 😊</button>
        </header>
        <body>

        </body>
      </div>
    )

}

export default SpotifyCallback;
