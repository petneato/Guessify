// SongCard Component - Displays a song card with album art, song title, and an action button

const SongCard = ({ albumArt, songTitle }) => {
    return (
        // Outer container for the song card
        <div className="flex bg-white w-full rounded-lg overflow-hidden h-[5.5vw] mb-[0.5vw]">
            
            {/* Album art image */}
            <img 
                src={albumArt}  // Source for the album art image
                alt="Album Art"  // Alt text for accessibility
                className="w-[5.5vw] h-[5.5vw] object-cover flex-shrink-0"  // Scaled size
            />
            
            {/* Container for the song title and action button */}
            <div className="flex flex-grow items-center p-[0.5vw] min-w-0">
                
                {/* Song title text */}
                <p className="text-[1vw] truncate text-black flex-grow">
                    {songTitle}  {/* The song title, which will truncate if too long */}
                </p>
                
                {/* Action button (e.g., add to playlist) */}
                <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white 
                w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center 
                transition-colors duration-300 text-[1.5vw] flex-shrink-0 ml-[0.5vw]">
                    +  {/* Button symbol */}
                </button>
            </div>
        </div>              
    );
}

export default SongCard;