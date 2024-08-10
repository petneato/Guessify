import React from "react";

const PlaylistCard = ({ PlaylistCover, playlistName }) => {
  const onClick = (event) => {
    // Access the clicked element
    const cardElement = event.currentTarget;

    // Toggle background color
    if (cardElement.style.backgroundColor === "blue") {
        cardElement.style.backgroundColor = "#191414"; // default color
    } else {
        cardElement.style.backgroundColor = "blue"; // clicked color
    }
};

    const addToSelected = () => {
        // Your add to selected logic here
    };


    return (
      <div
          className="custom-scrollbar flex flex-col justify-between 
          p-4 min-w-[300px] min-h-[443px] bg-spotifyCardBlack 
          text-white rounded-lg shadow-md shadow-black/50  cursor-pointer 
          transition-transform transform hover:scale-105"
          
          onClick={onClick}
      >
          <div className="flex-grow max-w-[280px] max-h-[280px]">
              <img 
                  src={PlaylistCover} 
                  alt={playlistName} 
                  className="w-full h-full object-cover rounded-md" 
              />
          </div>
          <h5 className="flex items-center justify-center my-2 text-spotifyWhite bg-orange ">{playlistName}</h5>
      </div>
  );
};

export default PlaylistCard;
