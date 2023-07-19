import React, { useEffect, useState } from "react";
import { getTracks } from "./Spotify"

function Test() {
    const [tracks, setTracks] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
      setToken(window.localStorage.getItem('access_token'));
    }, []);

    useEffect(() => {

        (async () => {
            if (token !== "") {
                const result = await getTracks(token, 'https://api.spotify.com/v1/playlists/57cPRDGLpwabrknspTEuxn/tracks');
                setTracks(result);
            }
        })();

    }, []);

    useEffect(() => {
        if (tracks) {
            console.log(tracks);
        }
    }, [tracks]);

    // ... render your component here

    return null; // replace this with your actual component rendering
}

export default Test;
