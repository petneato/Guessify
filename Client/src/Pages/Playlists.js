import React, { useState, useEffect } from "react";
import { getAllPlaylist, getProfile } from "../API/get.js";
import PlaylistCard from "../Components/PlaylistCard.js";

const Playlists = () => {  
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
    setToken(window.localStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        const playlists = await getAllPlaylist(token);
        const profile = await getProfile(token);
        
        if (profile.images && profile.images[1] && profile.images[1].url) {
          window.localStorage.setItem('profileImage', profile.images[1].url);
        }
        if (profile.display_name) {
          window.localStorage.setItem('profileName', profile.display_name);
        }
        if (profile.id) {
          window.localStorage.setItem('profileId', profile.id);
        }

        const data = playlists.map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          image: playlist.images[0]?.url,
          tracks: playlist.tracks.href
        }));
        setPlaylistData(data);
      }
    })();
  }, [token]);

  const handlePlaylistClick = (tracks) => {
    setSelectedPlaylists(prevSelected => 
      prevSelected.includes(tracks)
        ? prevSelected.filter(id => id !== tracks)
        : [...prevSelected, tracks]
    );
  };

  const nextPage = () => {
    if (selectedPlaylists.length === 0) return;
    window.localStorage.setItem('tracks', JSON.stringify(selectedPlaylists));
    window.location.href = "lobby";
  };

  return (
    <div className='flex flex-col items-center p-[2vw] h-screen'>
      <h1 className='text-[3vw] mb-[2vw]'>Select a Playlist</h1>
      
      <div className='grid grid-cols-6 gap-x-[1vw] gap-y-[2vw] w-[95vw] h-[38vw] overflow-y-auto custom-scrollbar'>
        {playlistData.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            PlaylistCover={playlist.image}
            playlistName={playlist.name}
            isSelected={selectedPlaylists.includes(playlist.tracks)}
            onClick={() => handlePlaylistClick(playlist.tracks)}
          />
        ))}
      </div>

      <button 
        onClick={nextPage} 
        className='mt-[2vw] bg-spotifyGreen text-white py-[1vw] px-[2vw] rounded-full text-[1.5vw] hover:bg-[#1DB954] transition-colors'
        disabled={selectedPlaylists.length === 0}
      >
        Next Page
      </button>
    </div>
  );
};

export default Playlists;