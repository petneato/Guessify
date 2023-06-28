import {loginPKCE, getProfile, getLoginToken, getPlaylist} from './Spotify.js'

import logo from '../Images/Spotify.png';
import '../CSS/View.css'

function View() {

  if (window.location.pathname === '/callback') {

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    window.localStorage.setItem("userCode", code);

    let codeVerifier = window.localStorage.getItem('codeVerifier');

    getLoginToken(code, codeVerifier);

    window.open("http://localhost:3000/home", "_self");

  } else if (window.location.pathname === '/home') {
    let accessToken = window.localStorage.getItem('access_token');
    
    // let data = getProfile(accessToken);

    // console.log(data);
    let playlists = getPlaylist(accessToken, '3cEYpjA9oz9GiPac4AsH4n');
    console.log(playlists);
    
    return (
      <div className="Super">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>welcome: {}</h4>
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
