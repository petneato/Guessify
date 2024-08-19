// LandingPage Component
import React from 'react';
import SongCard from '../Components/SongCard.js';
import guessifyLogo from '../Images/Guessify.png';
import AboutCube from '../Components/AboutCube.js'

const guessWhosSongDescription = 'Players select playlists from which songs will be randomly selected. A game palylist will be created and players will guess who each song in this playlist belongs too.'
const guessTheSongDescription = 'Plays select playlists from which songs will be randomly selected. A game playlist will be created and players will guess each song after hearing a small snippet.'


const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 h-full w-full box-border">
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        
        {/* Previous Songs Section */}
        <div className="flex flex-1 justify-center p-4">
          <div className="box-border flex flex-col w-full h-full bg-spotifyBlack rounded-3xl text-center">
            <p className="text-white m-6 text-4xl">Previous Songs</p>
            <div className="box-border custom-scrollbar flex flex-col h-full mb-10 p-4 overflow-y-auto">
              <SongCard albumArt={guessifyLogo} songTitle={"Hello world long song title"} />
            </div>
          </div>
        </div>

        {/* Guessing Buttons Section */}
        <div className="flex flex-1 flex-col justify-center items-center p-4">
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-10 my-2 py-4 md:py-10 rounded-full text-lg transition-colors duration-300 w-full max-w-xs">
            Guess Whose Song
          </button>
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-10 my-2 py-4 md:py-10 rounded-full text-lg transition-colors duration-300 w-full max-w-xs">
            Guess The Song
          </button>
        </div>

        {/* About Section */}
        <div className="flex flex-1 flex-col p-4 justify-between overflow-hidden">
          <div className="flex flex-col flex-grow">
            <AboutCube heading='About' content={guessTheSongDescription}/>
          </div>
          <div className="flex flex-col flex-grow mt-4">
            <AboutCube heading='About' content={guessWhosSongDescription}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
