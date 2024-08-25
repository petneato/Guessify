import React from 'react';
import SongCard from './SongCard.js';

const PreviousSongs = ({ songs }) => {
  return (
    <div className="flex flex-1 justify-center p-[0.5vw]">
      <div className="box-border flex flex-col w-full h-full bg-spotifyBlack rounded-[1vw] text-center">
        <p className="text-white m-[1vw] text-[2vw]">Previous Songs</p>
        <div className="box-border custom-scrollbar flex flex-col h-full mb-[1vw] px-[2vw] py-[0.5vw] overflow-y-auto">
          {songs.map((song, index) => (
            <div key={index} className="mb-[1vw]">
              <SongCard albumArt={song.albumArt} songTitle={song.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousSongs;