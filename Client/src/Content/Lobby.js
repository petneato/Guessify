import React, { useEffect, useState } from "react";
import "../CSS/Lobby.css";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, push, child, remove, onValue, update, get } from 'firebase/database';


function LobbyCreation() {

  let trackS = window.localStorage.getItem('tracks')
  const tracksA = trackS.split(",");
  const [gameMode, setGameMode] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");
  const [tracks, setTracks] = useState([]);
  const [rounds, setRounds] = useState(1);
  const [songsPerPlayer, setSongsPerPlayer] = useState(1);

  useEffect(() => {
    setTracks(tracksA)
  }, tracksA);

  const createGame = async (name) => {
  
    const auth = getAuth();
    const res = await signInAnonymously(auth);
    if (!res) {
      console.log('Sign in failed');
      return;
    }
  
    const db = getDatabase();
  
    const gameRef = ref(db, name);
    const snapshot = await get(gameRef);
  
    if (snapshot.exists()) {
      console.log('Game already exists');
      return;
    }
  
    // set game name and creator
    await set(gameRef, { name: name, creator: res.user.uid });
  
    // set tracks as a child node
    const creatorRef = child(gameRef, 'creator');

    //set uID of creator
    const uID = child(creatorRef, 'uID')
    await set(uID, res.user.uid)

    //Set the tracks for the creator
    for(let i = 0; i < tracks.length; i++){
      let trackRef = child(creatorRef, `track${i+1}`);
      await set(trackRef, tracks[i])
    }

    // set rounds as a child node with three more branches
    const roundsRef = child(gameRef, 'rounds');
    await set(roundsRef, rounds);

    const songsPerPlayerRef = child(gameRef, 'songs')
    await set(songsPerPlayerRef, songsPerPlayer)

      
      console.log('No errors');
      window.localStorage.setItem('uID', res.user.uid);
      window.localStorage.setItem('code', name);
      window.open('https://guessify-467fb.web.app/game', '_self');
      // window.open('http://localhost:3000/game', '_self')
      return;
  }

  const joinGame = async (code) => {
    const auth = getAuth();
    const res = await signInAnonymously(auth);
    if (!res) {
      console.log('Sign in failed');
      return 'Sign in failed';
    }
  
    const db = getDatabase();
    
    // Reference the game by its code
    const gameRef = ref(db, code);
    
    // Check if a snapshot of the data at this reference exists
    const snapshot = await get(gameRef);
    
    if (!snapshot.exists()) {
      // The game does not exist, so the user cannot join it
      console.log("Game does not exist, user cannot join");
      return;
    }
    
    // create Users node under the game
    const usersRef = child(gameRef, 'users');
  
    // Check how many children (users) there are currently
    let count = 0;
    const usersSnapshot = await get(usersRef);
    if (usersSnapshot.exists()) {
      count = Object.keys(usersSnapshot.val()).length;
    }
  
    // Increment the count and use it as the new user ID
    let userRef = child(usersRef, `uID${count + 1}`);
    await set(userRef, res.user.uid);
    
    console.log("User added to the game");

    // set tracks as a child node
    const creatorRef = child(gameRef, res.user.uid);
    for(let i = 0; i < tracks.length; i++){
      let trackRef = child(creatorRef, `track${i+1}`);
      await set(trackRef, tracks[i])
    }

    console.log('No errors');
    window.localStorage.setItem('uID', res.user.uid);
    window.localStorage.setItem('code', code);
    window.open('https://guessify-467fb.web.app/game', '_self');
    // window.open('http://localhost:3000/game', '_self');
    return
  }  
  
  

  const renderCreateGame = () => (
    <div>
      <h2>Create a new game</h2>
      <input
        className="lobby-input"
        type="text"
        maxLength={5}
        placeholder="Enter a 5-digit lobby code"
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      <h3>Number of rounds</h3>
      <div className="counter-container">
        <button className="counter-button" onClick={() => setRounds(Math.max(1, rounds - 1))}>-</button>
        <p>{rounds}</p>
        <button className="counter-button" onClick={() => setRounds(rounds + 1)}>+</button>
      </div>
      <h3>Songs per player</h3>
      <div className="counter-container">
        <button className="counter-button" onClick={() => setSongsPerPlayer(Math.max(1, songsPerPlayer - 1))}>-</button>
        <p>{songsPerPlayer}</p>
        <button className="counter-button" onClick={() => setSongsPerPlayer(songsPerPlayer + 1)}>+</button>
      </div>
      <button className="lobby-button" onClick={async () => {
          console.log('button clicked');
          const result = await createGame(lobbyCode);
          console.log('result');
          alert(result); // Notify the user about the creation result
      }}>Create Game</button>
    </div>
  );  

  const renderJoinGame = () => (
    <div>
      <h2>Join an existing game</h2>
      <input
        className="lobby-input"
        type="text"
        maxLength={5}
        placeholder="Enter a 5-digit game code"
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      <button className="lobby-button" onClick={async () => {
        console.log('Join button clicked');
        await joinGame(lobbyCode);
      }}>Join</button>
    </div>
  );

  return (
    <div className="lobby-container">
      <h1>Spotify Game Lobby</h1>
      {!gameMode ? (
        <>
            <div className="button-container">
                <button className="lobby-button" onClick={() => setGameMode("create")}>Create Game</button>
                <button className="lobby-button" onClick={() => setGameMode("join")}>Join Game</button>
            </div>
        </>
      ) : gameMode === "create" ? (
        renderCreateGame()
      ) : (
        renderJoinGame()
      )}
    </div>
  );
}

export default LobbyCreation;
