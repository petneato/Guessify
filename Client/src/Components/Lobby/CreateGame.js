import React from "react";
import NumberSelector from "./NumberSelector.js";

const CreateGame = ({ rounds, setRounds, songsPerPlayer, setSongsPerPlayer }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-spotifyWhite text-center">New Game</h2>
    <input
      className="w-full px-4 py-2 border border-gray-600 rounded-full bg-spotifyCardBlack text-spotifyWhite focus:outline-none focus:ring-2 focus:ring-spotifyGreen"
      type="text"
      maxLength={5}
      placeholder="Enter a 5-digit lobby code"
    />
    <NumberSelector
      label="Number of rounds"
      value={rounds}
      setValue={setRounds}
    />
    <NumberSelector
      label="Songs per player"
      value={songsPerPlayer}
      setValue={setSongsPerPlayer}
    />
    <button className="w-full py-2 px-4 bg-spotifyGreen text-spotifyWhite font-semibold rounded-full hover:bg-spotifyHoverGreen focus:outline-none focus:ring-2 focus:ring-spotifyGreen focus:ring-opacity-50">
      Create Game
    </button>
  </div>
);

export default CreateGame;