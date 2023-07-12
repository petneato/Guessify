import React, { useState, useEffect } from "react";
import { getAllPlaylist, getPlaylist } from "./Spotify";
import '../CSS/Playlist.css'

function Playlists() {  

  let [token, setToken] = useState("");
  let [playlists, setPlaylists] = useState([]);
  let [playlistData, setPlaylistData] = useState([]);
  let [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
      setToken(window.localStorage.getItem('access_token'));
  }, []);

  useEffect(() => {
    (async () => {
        if (token !== "") {
            setPlaylists(await getAllPlaylist(token));
        }
    })();
  }, [token]);

  useEffect(() => {
    console.log(playlists)

    let data = [];
    for (let playlist of playlists) { 
      let image = playlist.images[0].url
      data.push({name: playlist.name, image, id: playlist})
    }
  
    setPlaylistData(data)
  }, [playlists]);

  function select(idx) {
    console.log('index: ' + idx + " added")
    setSelectedPlaylists(oldSelectedPlaylists => [...oldSelectedPlaylists, idx])  
  }

  return (
    <div className='SuperC'>
      <h1>Select a Playlist</h1>

      <div className='cards'>
        {playlistData.map((playlist, index) => {
          return (
            <div key={index} className='listCard' >
              <img src={playlist.image} alt='Playlist Cover' />
              <h5 className='listName'>{playlist.name}</h5>
              <button onClick={() => select(playlist.id)} className='listBtn'>Select</button>
            </div>
          )
        })}
      </div>

    </div>
  );

}

export default Playlists;