//CHANGE ME vvvv
import { getPlaylist } from "../SpotifyTemp/Spotify";
import React, { useState, useEffect } from "react";
import '../CSS/View.css';
const PlaylistV2 = () => {

    let [token, setToken] = useState("");
    let [playlistJson, setPlaylistJson] = useState([]);

    useEffect(() => {
        setToken(window.localStorage.getItem('access_token'));
    }, []);

    useEffect(() => {
        //https://open.spotify.com/playlist/4PsFYH9aJDNjy7iwkWag7S?si=c4516555b59d4d21
        (async () => {
            if (token != "") {
                setPlaylistJson(await getPlaylist(token, "4PsFYH9aJDNjy7iwkWag7S"));
            }
        })();
    }, [token]);

    let output;

    if (playlistJson != []) {
        output = (
            <React.Fragment>
                <h1> playlist name: {playlistJson.name} </h1>
                <h3>playlist desc: {playlistJson.description}</h3>
            </React.Fragment>
        );
    } else {
        output  = "oops 💀💀💀💀💀";
    }

    return (
        <div>
            <h1>{output}</h1>
        </div>
    )

}
export default PlaylistV2;