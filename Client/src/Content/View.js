import {loginPKCE, getProfile, getLoginToken, getPlaylist} from './Spotify.js'
import { useState } from 'react';
import logo from '../Images/Spotify.png';
import '../CSS/View.css'

function View() {

  const [user, setUser] = useState("");


  if (window.location.pathname === '/callback') {

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    
    window.localStorage.setItem("userCode", code);

    

    let codeVerifier = window.localStorage.getItem('codeVerifier');

    getLoginToken(code, codeVerifier);

    let accessToken = window.localStorage.getItem('access_token');

    
    (async () => {
      setUser(await getProfile(accessToken));
      window.open("http://localhost:3000/home", "_self");
    })();
    

  } else if (window.location.pathname === '/home') {
    let accessToken = window.localStorage.getItem('access_token');
    
    console.log("user: "+user.display_name);
    
    return (
      <div className="Super">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>welcome: {user.display_name}</h4>
        </header>
        <body>

        </body>
      </div>
    )

  }


  

  return (
    <div className="Super">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Guessify</h1>
        <h3>Spotify Guessing Game</h3>

        <button onClick={loginPKCE}>Log In</button>
      </header>
      <body>

      </body>
    </div>
  );
}

export default View;
