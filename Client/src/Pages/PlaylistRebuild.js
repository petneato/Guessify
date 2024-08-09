const PlaylistRebuild = () => { 
    const test = []

    return (
        <div className="
            flex-col 
            justify-center 
            bg-spotifyBlack
            m-[1.5em]
            rounded
            ">
            <div className="
                flex-row
                text-center
                w-full
            
            ">
                <h1>Select a Playlist</h1>
            </div>


            <div className="flex-row text-center">   
                <button className='submit'>Next Page</button>
            </div>


            <div className="">
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