// LandingPage Component
import React from 'react';
import PreviousSongs from '../Components/PreviousSongs.js';
import AboutCube from '../Components/AboutCube.js'
import guessifyLogo from '../Images/Guessify.png';

const guessWhosSongDescription = 'Players select playlists from which songs will be randomly selected. A game palylist will be created and players will guess who each song in this playlist belongs too.'
const guessTheSongDescription = 'Plays select playlists from which songs will be randomly selected. A game playlist will be created and players will guess each song after hearing a small snippet.'

// Test song items using the Guessify logo as album art
const testSongs = [
  { albumArt: guessifyLogo, title: 'Bohemian Rhapsody' },
  { albumArt: guessifyLogo, title: 'Stairway to Heaven' },
  { albumArt: guessifyLogo, title: 'Imagine' },
  { albumArt: guessifyLogo, title: 'Smells Like Teen Spirit' },
  { albumArt: guessifyLogo, title: 'Billie Jean' },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-[1vw] h-full w-full box-border">
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        
        <PreviousSongs songs={testSongs} />

        {/* Guessing Buttons Section */}
        <div className="flex flex-1 flex-col justify-center items-center p-[0.5vw]">
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-[1vw] my-[0.5vw] px-[1.5vw] py-[2vw] rounded-full text-[1vw] transition-colors duration-300 w-full max-w-[20vw]">
            Guess Whose Song
          </button>
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white mx-[1vw] my-[0.5vw] px-[1.5vw] py-[2vw] rounded-full text-[1vw] transition-colors duration-300 w-full max-w-[20vw]">
            Guess The Song
          </button>
        </div>

        {/* About Section */}
        <div className="flex flex-1 flex-col p-[0.5vw] justify-between overflow-hidden">
          <div className="flex flex-col flex-grow">
            <AboutCube heading='About' content={guessTheSongDescription}/>
          </div>
          <div className="flex flex-col flex-grow mt-[1vw]">
            <AboutCube heading='About' content={guessWhosSongDescription}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;