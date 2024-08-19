// LandingPage Component
import React from 'react';
import SongCard from '../Components/SongCard.js';
import guessifyLogo from '../Images/Guessify.png';

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 h-full w-full bg-blue-400 box-border">
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        
        {/* Previous Songs Section */}
        <div className="flex flex-1 bg-red-300 justify-center p-4">
          <div className="box-border flex flex-col w-full h-full bg-spotifyBlack rounded-3xl text-center">
            <p className="text-white m-6 text-4xl">Previous Songs</p>
            <div className="box-border custom-scrollbar flex flex-col h-full mb-10 p-4 overflow-y-auto">
              <SongCard albumArt={guessifyLogo} songTitle={"Hello world long song title"} />
            </div>
          </div>
        </div>

        {/* Guessing Buttons Section */}
        <div className="flex flex-1 flex-col bg-green-300 justify-center items-center p-4">
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-10 my-2 py-4 md:py-10 rounded-full text-lg transition-colors duration-300 w-full max-w-xs">
            Guess Whose Song
          </button>
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-10 my-2 py-4 md:py-10 rounded-full text-lg transition-colors duration-300 w-full max-w-xs">
            Guess The Song
          </button>
        </div>

        {/* Placeholder Section */}
        <div className="flex flex-1 bg-yellow-300 p-4">
          {/* Additional content or placeholder */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
