import { useState } from "react"

const ViewModel = () => {
    //Token used to access users spotify data
    let [token, setToken] = useState("");

    //Meant to hold the playlists reference/raw data -- Whatever is more efficient
    let [PlaylistJson, setPlaylistsJson] = useState([]);

    //Will hold the playlists that the user selects for game use
    let [selectedPlaylists, setSelectedPlaylists] = useState([]);

    //Songs that are randomly selected from the selectedPlaylists state
    let [selectedSongs, setSelectedSongs] = useState([]);


//Going to start by making a getter and setter for each state
//-----------------------------------------------------------

    //selectedSong appender
    const addSelectedSong = (song) => {
        setSelectedSongs(...selectedSongs, song)
    }

    //selectedSong getter
    const getSelectedSong = () => {
        return selectedSongs;
    }

    //slectedPlaylist appender
    const addSelectedPlaylist = (selPlaylist) => {
        setSelectedPlaylist(...selectedPlaylist, selPlaylist)
    }

    const getSelectedPlaylist = () => {
        return selectedPlaylist;
    }
    

}