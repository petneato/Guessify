import { generateRandomString, generateCodeChallenge } from "../API/helper.js"


var client_id = 'd9f97736297e4a039202cb31e162c0ef';
var redirect_uri = window.location + "callback";


// var redirect_uri = 'https://guessify-467fb.web.app/callback';
// var client_id = '0b0bea5cfeed47ee881242f0a154bbc9';



//PKCE - Proof Key for Code Exchange
//Trying to reverse engineer this a bit. Quinn Originally coded the API connection
//Redirects to spotify site for login
export const loginPKCE = () => {
    let codeVerifier = generateRandomString(128);
    window.localStorage.setItem("codeVerifier", codeVerifier);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'playlist-read-private user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming playlist-modify-private playlist-modify-public';

        window.localStorage.setItem('code_verifier', codeVerifier);

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
    });}

//Retrieves access token with the requested permissions and saves it in window local storage
export const getLoginToken = async (code, codeVerifier) => {

    redirect_uri = window.location.origin + "/callback";

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
            window.localStorage.setItem('access_token', data.access_token);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

