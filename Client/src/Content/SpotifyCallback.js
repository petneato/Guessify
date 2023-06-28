import {loginPKCE, getProfile, getLoginToken, getPlaylist} from './Spotify.js'
import '../CSS/View.css';
import logo from '../Images/Spotify.png';
import { useState, useEffect } from "react";

function SpotifyCallback(){

    let [user, setUser] = useState([]);
    let [token, setToken] = useState("");

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


    return(
        <div className="Super">
        <header className="App-header">
          <img src={user.images[0].url} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>welcome: {user.display_name}</h4>
        </header>
        <body>

        </body>
      </div>
    )

}
export default SpotifyCallback;