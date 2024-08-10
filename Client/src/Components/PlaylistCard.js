import React from "react";

const PlaylistCard = ({ PlaylistCover, playlistName }) => {
    const isClicked = () => {
        // Your click handler logic here
    };

    const addToSelected = () => {
        // Your add to selected logic here
    };

    const onClick = () => {
      return;
    }

    return (
      <div
          className="custom-scrollbar flex flex-col justify-between p-4 min-w-[300px] min-h-[443px] bg-spotifyCardBlack text-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
          onClick={onClick}
      >
          <img src={PlaylistCover} alt={playlistName} className="w-full h-auto rounded-md" />
          <h5 className="my-2 text-center">{playlistName}</h5>
      </div>
  );
};

export default PlaylistCard;
