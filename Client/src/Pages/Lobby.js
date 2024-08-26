import React, { useState } from "react";
import LobbyHeader from "../Components/Lobby/LobbyHeader.js";
import CreateGame from "../Components/Lobby/CreateGame.js";
import JoinGame from "../Components/Lobby/JoinGame.js";
import GameModeSelection from "../Components/Lobby/GameModeSelection.js";
import BackButton from "../Components/Lobby/BackButton.js";

const Lobby = () => {
  const [gameMode, setGameMode] = useState("");
  const [rounds, setRounds] = useState(1);
  const [songsPerPlayer, setSongsPerPlayer] = useState(1);

  return (
    <div className="min-h-screen bg-spotifySand flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-spotifyBlack p-10 rounded-xl shadow-md relative">
        {gameMode && <BackButton onClick={() => setGameMode("")} />}
        <LobbyHeader />
        {!gameMode ? (
          <GameModeSelection setGameMode={setGameMode} />
        ) : gameMode === "create" ? (
          <CreateGame
            rounds={rounds}
            setRounds={setRounds}
            songsPerPlayer={songsPerPlayer}
            setSongsPerPlayer={setSongsPerPlayer}
          />
        ) : (
          <JoinGame />
        )}
      </div>
    </div>
  );
}

export default Lobby;