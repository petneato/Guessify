import React, { useEffect, useState } from "react";
import { getTracks } from "./Spotify"
import "../CSS/Game.css";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, push, child, remove, onValue, update, get, onChildAdded } from 'firebase/database';
import SpotifyPlayer from 'react-spotify-web-playback';
import defaultImage from '../Images/PP.png';


function Game() {
    // Define states
    let profileImage = defaultImage;
    if (window.localStorage.getItem('profileImage')) {
        profileImage = window.localStorage.getItem('profileImage');
    }

    const profileId = window.localStorage.getItem('profileId');

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const [token, setToken] = useState('');
    const [uID, setUID] = useState('');
    const [users, setUsers] = useState({});
    const [gameref, setGameref] = useState();
    const [gamePlaylists, setGamePlaylists] = useState({});
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
        // console.log(song); // This line will print the resolved value to the console

        let uris = song.items.map(item => item.track.uri);
        // console.log(uris);

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
              
        });

        setGameStarted(true);
        
    }

    const getRandomHelper = async (numSongs) => {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    
        let selectedSongs = {};
    
        const promises = tracks.map(async user => {
            let userPlaylists = Object.values(user.playlists);
            shuffleArray(userPlaylists);
    
            selectedSongs[user.user] = [];
    
            for (let playlist of userPlaylists) {
                let songs = await getHref(playlist);
                shuffleArray(songs);
    
                while (songs.length > 0 && selectedSongs[user.user].length < numSongs) {
                    selectedSongs[user.user].push(songs.pop());
                }
    
                if (selectedSongs[user.user].length === numSongs) {
                    break;
                }
            }
        });
    
        await Promise.all(promises);
    
        return selectedSongs;
    }
    
    const getRandom = async () => {
        try {
            const numRoundsSnapshot = await get(ref(db, code + '/rounds'));
            const numSongsSnapshot = await get(ref(db, code + '/songs'));
    
            if (!numRoundsSnapshot.exists() || !numSongsSnapshot.exists()) {
                console.log("No data available");
                return;
            }
    
            const numRounds = numRoundsSnapshot.val();
            const numSongs = numSongsSnapshot.val();
    
            const result = await getRandomHelper(numSongs);
            setGamePlaylists(result);
            // console.log('results');
            // console.log(result);
    
        } catch (error) {
            console.error(error);
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

    const createPlaylist = async (name, description, tracks) => {
        const endpoint = `https://api.spotify.com/v1/users/${profileId}/playlists`;
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
    
    const interleaveTracks = (playlists) => {
        let result = [];
        let i = 0;
        let added = true;
    
        while (added) {
            added = false;
            for (let userTracks of Object.values(playlists)) {
                if (i < userTracks.length) {
                    result.push(userTracks[i]);
                    added = true;
                }
            }
            i++;
        }
    
        return result;
    }

    const button = async () => {
        if (!gameStarted) {
            await startGame();
        }
        await getRandom();
        const allTracks = await interleaveTracks(gamePlaylists);
        createPlaylist(formattedDate + ' Guessify', 'Guessify Playlist for given date', allTracks);        
        setTest(allTracks);
    };
    

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

    useEffect(() => {
        console.log('Game');
        console.log(gamePlaylists);
    }, [gamePlaylists]);

    // Render the game interface
    return (
        <div className='super'>
            <SpotifyPlayer
                token={token}
                uris={test}
            />
            <h2 className='lobbyName'>Lobby Code: {code}</h2>
            <div className="Gameplay">
                {Object.keys(users).map((user) => (
                    <div className='Card' key={user}>
                        <h5>{user}</h5>
                        {profileImage && <img src={profileImage} alt="Profile" className="profileImage" />}
                        <button className='voteBtn'>Vote</button>
                    </div>
                ))}
                <div className="buttonContainer">
                    <button className='lockIn' onClick={button}>Generate Playlist</button>
                </div>
            </div>
        </div>
    );

}

export default Game