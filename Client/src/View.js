import {loginPKCE, getProfile, getLoginToken, getPlaylist} from './Spotify.js'
import logo from '../Images/Spotify.png';
import '../CSS/View.css'

function View() {

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
