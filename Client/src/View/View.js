import logo from './Spotify.png';
import './View.css';

var client_id = 'd9f97736297e4a039202cb31e162c0ef';
var redirect_uri = 'http://localhost:3000/callback';

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function getProfile(accessToken) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  let data = await response.json();
  // console.log(data.display_name)
  return data;
}

function loginPKCE() {
  let codeVerifier = generateRandomString(128);
  window.localStorage.setItem("codeVerifier", codeVerifier);
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
  });
}

function getLoginToken(code, codeVerifier) {

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    code_verifier: codeVerifier
  });

  const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('access_token', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

function login() {

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
  window.open(url, "_self");

}

const APIController = (function () {

  const clientId = '';
  const clientSecret = '';

  const _getToken = async () => {

    const result = await fetch('http://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_cridentials'
    });

    const data = await result.json();
    return data.access_token;

  }

})();

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
    
    let data = getProfile(accessToken);
    console.log(data);
    return (
      <div className="Super">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Guessify</h1>
          <h3>Spotify Guessing Game</h3>
          <h4>welcome: { data.value }</h4>
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
