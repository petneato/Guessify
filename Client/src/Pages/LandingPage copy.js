import React from 'react';
import SongCard from '../Components/SongCard';


const LandingPage = () => {
  return (
    
      <div className="flex flex-row items-center justify-center p-8 h-full">

        
        <div className='flex flex-col grow mx-3 h-full'>
          <div className="bg-spotifyBlack p-8 rounded-lg justify-center my-auto h-95p w-50p">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Songs From Previous Match</h2>
            <p className="te xt-lg text-white">
              This is a music guessing game powered by Spotify. Choose a game mode and start playing!
            </p>

          </div>
        </div>

        <div className='flex flex-col h-95p mr-3 justify-between'>
        <div className="flex space-x-4 mb-8 justify-center">
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white px-6 py-3 rounded-full text-lg transition-colors duration-300">
            Classic
          </button>
          <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white px-6 py-3 rounded-full text-lg transition-colors duration-300">
            Guess Song
          </button>
        </div>

        <div className="bg-spotifyBlack p-8 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-lg text-white">
            This is a music guessing game powered by Spotify. Choose a game mode and start playing!
          </p>
        </div>
      </div>
      </div>

  );
};

export default LandingPage;