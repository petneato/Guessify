import React, { useEffect, useState } from "react";
import { getTracks } from "./Spotify"
import "../CSS/Game.css";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, push, child, remove, onValue, update, get, onChildAdded } from 'firebase/database';


function Game() {
    const [token, setToken] = useState('');
    const [uID, setUID] = useState('');
    const [users, setUsers] = useState({});
    const [gameref, setGameref] = useState();
    const [gamePlaylists, setGamePlaylists] = useState({});
    const [tracks, setTracks] = useState([]);
    const [auth, setAuth] = useState();
    const [res, setRes] = useState();
    const [test, setTest] = useState();
    const db = getDatabase();
    const code = window.localStorage.getItem('code')
    const usersRef = ref(db, code + '/users');

    const init = async () => {
        let auth = getAuth();
        let res = await signInAnonymously(auth);
        if (!res) {
            console.log('Sign in failed');
            return res;
        }
    
        setAuth(auth);
        setRes(res);
    
        const gameRef = ref(db, code);

        setGameref(gameRef);
        
    }

    const getHref = async (uid) => {

        let song = (async () => {
            if (token !== '') {
                setTracks(await getTracks(token, 'https://api.spotify.com/v1/playlists/57cPRDGLpwabrknspTEuxn/tracks'));
            }
        })();

    }

    const startGame = async () => {
        Object.values(users).forEach(user => {
            const tracksRef = ref(db, code + '/' + user)
            get(tracksRef).then((snapshot) => {
                if (snapshot.exists()) {
                    let obj = snapshot.val()
                    setTracks(prevTracks => [...prevTracks, {user, obj}]);
                    console.log('op')
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        });
           
        
    }
    const loadRound = async () => {

    }

    const getRandom = async () => {

    }

    const createPlaylist = async () => {

    }

    const setScore = async () => {

    }

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
        console.log(users);
        startGame();
    }, [users])


    useEffect(() => {
        console.log(tracks);
    }, [tracks])
    
    // ...
    return null;
}

export default Game