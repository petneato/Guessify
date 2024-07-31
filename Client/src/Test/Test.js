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

const userId = 'YOUR_SPOTIFY_USER_ID'; // Replace with your Spotify user ID
const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with your Spotify access token

const createPlaylist = async (name, description, tracks) => {
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const requestBody = {
        name: name,
        description: description,
        public: true
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
        console.log(`Playlist created with ID: ${data.id}`);
        await addTracksToPlaylist(data.id, tracks);
    } else {
        console.error(`Error creating playlist: ${data.error.message}`);
    }
}

const addTracksToPlaylist = async (playlistId, tracks) => {
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const requestBody = {
        uris: tracks
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
        console.log(`Tracks added to playlist with ID: ${playlistId}`);
    } else {
        console.error(`Error adding tracks to playlist: ${data.error.message}`);
    }
}

const tracks = [
    'spotify:track:TRACK_ID_1', // Replace with actual track ID
    'spotify:track:TRACK_ID_2', // Replace with actual track ID
    // ... add more track URIs as needed
];

createPlaylist('My New Playlist', 'A description for my new playlist.', tracks);


export default Test;

    // useEffect(() => {
    //     // Create a script element
    //     const script = document.createElement("script");
    
    //     // Set its source
    //     script.src = "https://sdk.scdn.co/spotify-player.js";
    
    //     // Define the SDK ready function
    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         const player = new window.Spotify.Player({
    //             name: "Your Web Playback SDK Quick Start Player",
    //             getOAuthToken: (callback) => {
    //                 callback(token); // Pass your token here
    //             },
    //         });
    
    //         // Ready state
    //         player.addListener("ready", ({ device_id }) => {
    //             console.log("Ready with Device ID", device_id);
    //         });
    
    //         // Not Ready state
    //         player.addListener("not_ready", ({ device_id }) => {
    //             console.log("Device ID has gone offline", device_id);
    //         });
    
    //         // Connect the player
    //         player.connect();
    
    //         // Handle errors
    //         player.addListener("initialization_error", ({ message }) => {
    //             console.error(message);
    //         });
    //         player.addListener("authentication_error", ({ message }) => {
    //             console.error(message);
    //         });
    //         player.addListener("account_error", ({ message }) => {
    //             console.error(message);
    //         });
    //         player.addListener("playback_error", ({ message }) => {
    //             console.error(message);
    //         });
    //     };
    
    //     // Add the script to the body
    //     document.body.appendChild(script);
    
    //     // Cleanup on unmount
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []); // Pass token as a dependency if it changes over time