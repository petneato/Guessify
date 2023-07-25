import React, { useEffect, useState } from "react";
import { getTracks } from "./Spotify"
import "../CSS/Game.css";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, push, child, remove, onValue, update, get, onChildAdded } from 'firebase/database';
import SpotifyPlayer from 'react-spotify-web-playback'

function Game() {
    // Define states
    const [token, setToken] = useState('');
    const [uID, setUID] = useState('');
    const [users, setUsers] = useState({});
    const [gameref, setGameref] = useState();
    const [gamePlaylists, setGamePlaylists] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [auth, setAuth] = useState();
    const [res, setRes] = useState();
    const [test, setTest] = useState();
    const [isCreator, setIsCreator] = useState(false);

    // Firebase database instance
    const db = getDatabase();
    // Game code from local storage
    const code = window.localStorage.getItem('code')
    // Reference to users in the Firebase database
    const usersRef = ref(db, code + '/users');

    
    // Initialize Firebase and other settings
    const init = async () => {


        
        // setUID(uID);
        setAuth(auth);
        setRes(res);
    
        const gameRef = ref(db, code);

        setGameref(gameRef);
        
    }



    // Effect hook to initialize Firebase and other settings, and set up user listener
    useEffect(() => {
        init();
        setUID(window.localStorage.getItem('uID'));
        setToken(window.localStorage.getItem('access_token'));

        // Attach an asynchronous callback to read the data at our posts reference
        onValue(usersRef, (snapshot) => {
            setUsers(snapshot.val())
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });

    }, []);
    
    
    // Render the game interface
    return (
        <div className='super'>
            <SpotifyPlayer
                token={token}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
            />
            <h2 className='lobbyName'>Lobby Code: {code}</h2>
            <div className="Gameplay">
                {Object.keys(users).map((user) => (
                    <div className='Card' key={user}>
                        <h5>{user}</h5>
                        <button className='voteBtn'>Vote</button>
                    </div>
                ))}
                <div className="buttonContainer">
                    {/* {isCreator && !gameStarted && <button onClick={startGame} className='startGame'>Start Game</button>} */}
                    <button className='lockIn'>Lock In</button>
                </div>
            </div>
        </div>
    );

}

export default Game