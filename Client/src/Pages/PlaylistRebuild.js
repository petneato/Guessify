const PlaylistRebuild = () => { 
    const test = []

    return (
        <div>
            <div>
                <h1>Select a Playlist</h1>
            </div>


            <div>   
                <button onClick={nextPage} className='submit'>Next Page</button>
            </div>


            <div>
                {test.map((PlaylistObj, Playlist) => { 
                    
                })};
            </div> 


            <div>
                <button className='listBtn'>Select</button>
            </div>
        </div>

    );
}

export default PlaylistRebuild