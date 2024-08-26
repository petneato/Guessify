import React from "react";

const GameModeSelection = ({ setGameMode }) => (
  <div className="space-y-4">
    <button className="w-full py-3 px-4 bg-spotifyGreen text-spotifyWhite font-semibold rounded-full hover:bg-spotifyHoverGreen focus:outline-none focus:ring-2 focus:ring-spotifyGreen focus:ring-opacity-50" onClick={() => setGameMode("create")}>
      Create Game
    </button>
    <button className="w-full py-3 px-4 bg-spotifyGreen text-spotifyWhite font-semibold rounded-full hover:bg-spotifyHoverGreen focus:outline-none focus:ring-2 focus:ring-spotifyGreen focus:ring-opacity-50" onClick={() => setGameMode("join")}>
      Join Game
    </button>
  </div>
);

export default GameModeSelection;