var client_id = 'd9f97736297e4a039202cb31e162c0ef';
// var redirect_uri = 'https://guessify-467fb.web.app/callback';

// var client_id = '0b0bea5cfeed47ee881242f0a154bbc9';
var redirect_uri = window.location + "callback";

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

export function loginPKCE() {
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
    });
}

export function getLoginToken(code, codeVerifier) {

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

export async function getProfile(accessToken) {

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}

export async function getPlaylist(accessToken, playlistURI){

    const response = await fetch('https://api.spotify.com/v1/playlists/'+playlistURI, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}

export async function getAllPlaylist(acessToken) {
    let offset = 0;
    let allPlaylists = [];

    while(true) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`, {
                headers: {
                    Authorization: 'Bearer ' + acessToken
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            allPlaylists = allPlaylists.concat(data.items); // Merging the fetched playlists

            // If there are no more playlists, break the loop
            if (!data.next) {
                break;
            }

            // If there are more playlists, increment the offset by 50 for the next call
            offset += 50;

        } catch (error) {
            console.error(`Fetch Error: ${error}`);
            return [];
        }
    }
    
    return allPlaylists;
}

export async function getTracks(accessToken, track){

    const response = await fetch(track, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}