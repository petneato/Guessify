import React, { useState } from "react";
import "../CSS/Lobby.css";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, push, child, remove, onValue, update, get } from 'firebase/database';


function LobbyCreation() {
  const [gameMode, setGameMode] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");
  const [tracks, setTracks] = useState(window.localStorage.getItem('tracks'));
  const [rounds, setRounds] = useState(1);
  const [songsPerPlayer, setSongsPerPlayer] = useState(1);

  const createGame = async (name) => {
    
    const auth = getAuth();
    const res = await signInAnonymously(auth);
    if (!res) {
      console.log('Sign in failed');
      return 'Sign in failed';
    }
  
    const db = getDatabase();
  
    const gameRef = ref(db, `games/${name}`);
    const snapshot = await get(gameRef);
  
    if (snapshot.exists()) {
      console.log('Game already exists');
      return 'Game already exists';
    }
  
    await set(gameRef, { name: name, creator: res.user.uid, rounds });
    const creatorTracksRef = child(ref(db, 'creator'), 'tracks')

    set(creatorTracksRef, tracks)

    const usersRef = child(ref(db), 'Users')
    

    let roundsRef = [];
    for (let i = 0; i < rounds; i++) {
      roundsRef.push(child())
    }
    console.log('No errors');
    return 'No errors';
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
      <button className="lobby-button" onClick={() => alert(`Joining game ${lobbyCode}`)}>Join</button>
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
