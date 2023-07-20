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