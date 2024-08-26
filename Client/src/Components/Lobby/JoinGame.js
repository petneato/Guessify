import React from "react";

const JoinGame = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-spotifyWhite text-center">Join an existing game</h2>
    <input
      className="w-full px-4 py-2 border border-gray-600 rounded-full bg-spotifyCardBlack text-spotifyWhite focus:outline-none focus:ring-2 focus:ring-spotifyGreen"
      type="text"
      maxLength={5}
      placeholder="Enter a 5-digit game code"
    />
    <button className="w-full py-2 px-4 bg-spotifyGreen text-spotifyWhite font-semibold rounded-full hover:bg-spotifyHoverGreen focus:outline-none focus:ring-2 focus:ring-spotifyGreen focus:ring-opacity-50">
      Join Game
    </button>
  </div>
);

export default JoinGame;