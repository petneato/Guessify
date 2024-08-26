import React from "react";

const NumberSelector = ({ label, value, setValue }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-spotifyWhite text-center">{label}</h3>
    <div className="flex items-center justify-center space-x-4">
      <button className="w-10 h-10 text-2xl font-bold bg-spotifyGreen text-spotifyWhite rounded-full hover:bg-spotifyHoverGreen focus:outline-none" onClick={() => setValue(Math.max(1, value - 1))}>-</button>
      <p className="text-xl font-semibold text-spotifyWhite w-10 text-center">{value}</p>
      <button className="w-10 h-10 text-2xl font-bold bg-spotifyGreen text-spotifyWhite rounded-full hover:bg-spotifyHoverGreen focus:outline-none" onClick={() => setValue(value + 1)}>+</button>
    </div>
  </div>
);

export default NumberSelector;