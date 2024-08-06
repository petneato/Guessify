import {loginPKCE, getProfile, getLoginToken, getPlaylist} from '../SpotifyTemp/Spotify.js'
import '../CSS/View.css';
import logo from '../Images/Spotify.png';
import { useState, useEffect } from "react";


//Page displayed after user login
function PostLogin(){

    let [user, setUser] = useState("");
    let [token, setToken] = useState("");
    let [image, setImage] = useState("");

    //Sends the user to playlist selection
    let goPlay = () => { window.location.href = "playlists"; }

    //
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
            if(token){
                setUser(await getProfile(token));
            }
        })();

    }, [token])

    useEffect(() => {
        console.log(image)
        if(image){
            try {setImage( user.images[1].url ); } catch {}
        } else {
            setImage(logo);
        }
    }, [user]);

    return(
        <div className="Super">
        <header className="App-header">
          <img src={image} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>Welcome {user.display_name}!</h4>
          <button onClick={goPlay} >playlist veiwer</button>
        </header>
        <body>

        </body>
      </div>
    )

}

export default PostLogin;
