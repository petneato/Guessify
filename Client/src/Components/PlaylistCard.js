import React, { useState } from "react";

const PlaylistCard = ({ PlaylistCover, playlistName }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClick = () => {
    // Toggle the selection state
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`custom-scrollbar flex flex-col 
          p-4 min-w-[240px] min-h-[310px] text-white rounded-lg shadow-md shadow-black/50 cursor-pointer 
          transition-transform transform hover:scale-105 ${
            isSelected ? "bg-[#1DB954]" : "bg-spotifyCardBlack"
          }`}
      onClick={onClick}
    >
      <div className="flex-grow max-w-[210px] max-h-[210px] min-h-[170px] min-w-[170px]">
        <img
          src={PlaylistCover}
          alt={playlistName}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <p className="flex-grow flex items-center justify-center text-spotifyWhite w-full text-center mt-4 text-2xl">
        {playlistName}
      </p>
    </div>
  );
};

export default PlaylistCard;
