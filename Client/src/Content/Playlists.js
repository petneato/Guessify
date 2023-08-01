import React, { useState, useEffect } from "react";
import { getAllPlaylist, getPlaylist } from "./Spotify";
import '../CSS/Playlist.css'

function Playlists() {  

  let [token, setToken] = useState("");
  let [playlists, setPlaylists] = useState([]);
  let [playlistData, setPlaylistData] = useState([]);
  let [selectedPlaylists, setSelectedPlaylists] = useState([]);
  let [clickCounts, setClickCounts] = useState({});

  useEffect(() => {
      setToken(window.localStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    (async () => {
        if (token) {
            setPlaylists(await getAllPlaylist(token));
        }
    })();
  }, [token]);

  useEffect(() => {
    if(playlists) {
      let data = [];
      for (let playlist of playlists) {
        let image;
        try{ image = playlist.images[0].url; } catch{}
        data.push({name: playlist.name, image: image, tracks: playlist.tracks.href});
      }
      setPlaylistData(data)
    }
  }, [playlists]);

  useEffect(() => {
    console.log(selectedPlaylists);
  }, [selectedPlaylists]);

  function handleClick(tracks) {
    // Create new click counts
    const newClickCounts = {
      ...clickCounts,
      [tracks]: clickCounts[tracks] ? clickCounts[tracks] + 1 : 1
    };

    setClickCounts(newClickCounts);

    // Update selected playlists based on new click counts
    if (newClickCounts[tracks] % 2 === 1) {
      setSelectedPlaylists(prevSelectedPlaylists => [...prevSelectedPlaylists, tracks]);
    } else {
      setSelectedPlaylists(prevSelectedPlaylists => prevSelectedPlaylists.filter(id => id !== tracks));
    }
  }

  function nextPage() {
    if (selectedPlaylists.length === 0) {
      return; // Don't do anything if no playlists are selected
    }
    window.localStorage.setItem('tracks', selectedPlaylists);
    window.location.href = "lobby"
  }

  return (
    <div className='SuperC'>
      <h1>Select a Playlist</h1>
      <button onClick={nextPage} className='submit'>Next Page</button>

      <div className='cards'>
        {playlistData.map((playlist, index) => {
          const clickCount = clickCounts[playlist.tracks] || 0;
          const buttonStyle = clickCount % 2 === 0 ? '#1ED760' : 'red';
          return (
            <div key={index} className='listCard' >
              <img src={playlist.image} alt='Playlist Cover' />
              <h5 className='listName'>{playlist.name}</h5>
              <button 
                id = {playlist.tracks} 
                className='listBtn' 
                style={{ backgroundColor: buttonStyle }}
                onClick={() => handleClick(playlist.tracks)}
              >
                Select
              </button>
            </div>
          )
        })}
      </div>

      <button onClick={nextPage} className='submit'>Next Page</button>

    </div>
  );

}

export default Playlists;