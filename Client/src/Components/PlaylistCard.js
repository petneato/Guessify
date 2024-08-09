const PlaylistCard = (PlaylistCover, playlistName) => {

    const isClicked = () => {

    }

    const addToSelected = () => {
        
    }

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
}

export default PlaylistCard