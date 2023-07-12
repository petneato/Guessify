import React, { useState, useEffect } from "react";
import { getAllPlaylist, getPlaylist } from "./Spotify";
import '../CSS/Playlist.css'

function Playlists() {  

  let [token, setToken] = useState("");
  let [playlists, setPlaylists] = useState([]);
  let [playlistData, setPlaylistData] = useState([]);

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

  // useEffect(() => {
  //   (async () => {
  //     let data = [];
  //     for(let playlist of playlists) {
  //       let currPlaylist = await getPlaylist(token, playlist);
  //       let image = currPlaylist.images[0].url
  //       data.push({name: currPlaylist.name, image})
  //     }
  //     setPlaylistData(data);
  //   })();
  // }, [playlists]);

  useEffect(() => {
    console.log(playlists)

    let data = [];
    for (let playlist of playlists) { 
      let image = playlist.images[0].url
      data.push({name: playlist.name, image})
    }

    setPlaylistData(data)
  }, [playlists]);

  return (
    <div className='Super'>
      <h1>Select a Playlist</h1>

      <div className='cards'>
        {playlistData.map((playlist, index) => {
          return (
            <div key={index} className='listCard' >
              <img src={playlist.image} alt='Playlist Cover' />
              <h5 className='listName'>{playlist.name}</h5>
              <button className='listBtn'>Select</button>
            </div>
          )
        })}
      </div>

    </div>
  );

}

// function getCoverImg(imgUrl){
//   return fetch(imgUrl)
//     .then(response => response.blob())
//     .then(blob => {
//       let objectURL = URL.createObjectURL(blob);
//       return objectURL; // return the URL, not an img element
//     })
//     .catch(error => console.error(error));
// }


export default Playlists;