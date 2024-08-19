// SongCard Component - Displays a song card with album art, song title, and an action button

const SongCard = ({ albumArt, songTitle }) => {
    return (
        // Outer container for the song card
        <div className="flex bg-white w-full rounded-lg overflow-hidden">
            
            {/* Album art image */}
            <img 
                src={albumArt}  // Source for the album art image
                alt="Album Art"  // Alt text for accessibility
                className="w-[100px] h-[100px] object-cover flex-shrink-0"  // Fixed size and prevents shrinking
            />
            
            {/* Container for the song title and action button */}
            <div className="flex flex-grow items-center p-4 min-w-0">
                
                {/* Song title text */}
                
                <p className="text-2xl truncate text-black flex-grow">
                    {songTitle}  {/* The song title, which will truncate if too long */}
                </p>
                
                {/* Action button (e.g., add to playlist) */}
                <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white 
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-colors duration-300 text-4xl flex-shrink-0 ml-4">
                    +  {/* Button symbol */}
                </button>
            </div>
        </div>              
    );
}

export default SongCard;
