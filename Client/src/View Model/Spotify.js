import { generateRandomString, generateCodeChallenge } from "../API/helper.js"

// const client_id = 'd9f97736297e4a039202cb31e162c0ef';
const client_id = '0b0bea5cfeed47ee881242f0a154bbc9';

// Function to get the appropriate redirect URI
const getRedirectUri = () => {
    return `${window.location.protocol}//${window.location.host}`;
};

const redirect_uri = getRedirectUri();

//PKCE - Proof Key for Code Exchange
//Trying to reverse engineer this a bit. Quinn Originally coded the API connection
//Redirects to spotify site for login
export const loginPKCE = async () => {
    let codeVerifier = generateRandomString(128);
    window.localStorage.setItem("codeVerifier", codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
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
    
    const authUrl = 'https://accounts.spotify.com/authorize?' + args;
    
    const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');
    if (authWindow) {
        const code = await new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                try {
                    if (authWindow.closed) {
                        clearInterval(checkInterval);
                        resolve(null);
                    } else if (authWindow.location.origin === window.location.origin) {
                        const urlParams = new URLSearchParams(authWindow.location.search);
                        const code = urlParams.get('code');
                        authWindow.close();
                        clearInterval(checkInterval);
                        resolve(code);
                    }
                } catch (e) {
                    // Ignore cross-origin errors
                }
            }, 100);
        });

        if (code) {
            await getLoginToken(code, codeVerifier);
            window.localStorage.setItem('loginEvent', Date.now().toString());
            window.dispatchEvent(new Event('loginEvent'));
            return window.localStorage.getItem('access_token');
        }
    }
    return null;
};

export const getLoginToken = async (code, codeVerifier) => {
    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        code_verifier: codeVerifier
    });

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const data = await response.json();
        window.localStorage.setItem('access_token', data.access_token);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getUserProfile = async () => {
    const token = window.localStorage.getItem('access_token');
    if (!token) return null;

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

export const signOut = async () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('profileImage');
    window.localStorage.setItem('logoutEvent', Date.now().toString());
    window.dispatchEvent(new Event('logoutEvent'));
    // You may want to add any other cleanup here, such as clearing other user-related data from localStorage
};