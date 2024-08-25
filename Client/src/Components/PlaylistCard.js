import React from "react";

const PlaylistCard = ({ PlaylistCover, playlistName, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col 
          p-[0.5vw] w-[15vw] h-[18vw] text-white rounded-[0.5vw] shadow-md shadow-black/50 cursor-pointer 
          transition-transform transform hover:scale-105 ${
            isSelected ? "bg-[#1DB954]" : "bg-spotifyCardBlack"
          }`}
      onClick={onClick}
    >
      <div className="flex-grow w-full h-[13vw]">
        <img
          src={PlaylistCover}
          alt={playlistName}
          className="w-full h-full object-cover rounded-[0.25vw]"
        />
      </div>
      <p className="flex-grow flex items-center justify-center text-spotifyWhite w-full text-center mt-[0.5vw] text-[1vw] truncate">
        {playlistName}
      </p>
    </div>
  );
};

export default PlaylistCard;