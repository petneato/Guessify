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
        // let uID = window.localStorage.get('uID');
        let auth = getAuth();
        let res = await signInAnonymously(auth);
        if (!res) {
            console.log('Sign in failed');
            return res;
        }

        
        // setUID(uID);
        setAuth(auth);
        setRes(res);
    
        const gameRef = ref(db, code);

        setGameref(gameRef);
        
    }

    // Fetch Spotify tracks based on the provided href
    const getHref = async (href) => {
        let song = (async () => {
            if (token !== '') {
                return await getTracks(token, href);
            }
        })();
    
        song = await song; // This line will wait for the promise to resolve and then assign the resolved value to the song variable
        console.log(song); // This line will print the resolved value to the console

        let uris = song.items.map(item => item.track.uri);
        console.log(uris);

        return uris;
    }
    
    // Start the game by fetching user playlists and tracks
    const startGame = async () => {
        // Loop over each user and fetch their playlists
        Object.values(users).forEach(user => {
            const tracksRef = ref(db, code + '/' + user)
            const creatorRef = ref(db, code + '/creator')
            get(tracksRef).then((snapshot) => {
                if (snapshot.exists()) {
                    let playlists = snapshot.val()
                    setTracks(prevTracks => [...prevTracks, {user, playlists}]);
                } else {
                  console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            get(creatorRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                  console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
              
        });

        setGameStarted(true);
        
    }

    // Check if current user is the creator of the game
    const runIfCreator = async () => {
        const creatorIDRef = ref(db, code + '/creator/uID');
    
        get(creatorIDRef).then((snapshot) => {
            if (snapshot.exists()) {
                if (uID === snapshot.val()) {
                    console.log("Running the function because the user is the creator");
                    setIsCreator(true);
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }    

    // Randomly select songs from the user's playlists for the game
    const getRandomHelper = async (numSongs) => {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    
        let selectedSongs = {};
    
        for (let user of tracks) {
            let userPlaylists = Object.values(user.playlists);
            shuffleArray(userPlaylists);
    
            selectedSongs[user.user] = [];
    
            for (let i = 0; i < userPlaylists.length; i++) {
                let songs = await getHref(userPlaylists[i]);
                shuffleArray(songs);
                
                while (songs.length > 0 && selectedSongs[user.user].length < numSongs) {
                    selectedSongs[user.user].push(songs.pop());
                }
    
                if (selectedSongs[user.user].length === numSongs) {
                    break;
                }
            }
        }
    
        return selectedSongs;
    }
    

    // Determine how many songs to select based on the number of rounds
    const getRandom = async () => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }
    
        const numRoundsRef = ref(db, code + '/rounds')
        const songsRef = ref(db, code + '/songs')
    
        let numSongs;
        let numRounds;
    
        get(numRoundsRef).then((snapshot) => {
            if (snapshot.exists()) {
                numRounds = snapshot.val();
            } else {
              console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    
        get(songsRef).then((snapshot) => {
            if (snapshot.exists()) {
                numSongs = snapshot.val();
                getRandomHelper(numSongs).then(result => console.log(result)); // Moved inside .then
            } else {
              console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const loadRound = async () => {

    }

    const createPlaylist = async () => {

    }

    const setScore = async () => {

    }

    // Effect hook to initialize Firebase and other settings, and set up user listener
    useEffect(() => {
        init();
        setUID(window.localStorage.getItem('uID'));
        setToken(window.localStorage.getItem('access_token'));
        runIfCreator();

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
                    {isCreator && !gameStarted && <button onClick={startGame} className='startGame'>Start Game</button>}
                    <button className='lockIn'>Lock In</button>
                </div>
            </div>
        </div>
    );

}

export default Game