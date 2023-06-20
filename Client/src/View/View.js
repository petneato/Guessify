import logo from './Spotify.png';
import './View.css';
import { useHistory } from 'react-router-dom';


const id = '0b0bea5cfeed47ee881242f0a154bbc9';
const secretid = '3ca63b7d0b074a629b52a58a0ff9a7d4';

var client_id = 'd9f97736297e4a039202cb31e162c0ef';
var redirect_uri = 'http://localhost:3000/callback';

const APIController = (function() {

  const clientId = '';
  const clientSecret = '';

  const _getToken = async () => {
    
    const result = await fetch('http://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_cridentials'
    });

    const data = await result.json();
    return data.access_token;

  }
})();

function login(){
    const history = useHistory();

    var state = 'test';
    var stateKey = 'test';

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    console.log(url);
    window.open(url);

    history.push('/Paylist.js');
}

function View() {
  return (
    <div className="Super">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Guessify</h1>
        <h3>Spotify Guessing Game</h3>

        <button onClick={login}>Log In</button>
      </header>
      <body>

      </body>
    </div>
  );
} 

export default View;
