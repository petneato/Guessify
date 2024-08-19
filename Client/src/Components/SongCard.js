const SongCard = ({ albumArt, songTitle }) => {
    return (
        <div className="flex bg-white w-full rounded-lg overflow-hidden">
            <img 
                src={albumArt} 
                alt="Album Art" 
                className="w-[100px] h-[100px] object-cover flex-shrink-0" 
            />
            <div className="flex flex-grow items-center p-4 min-w-0">
                <p className="text-2xl truncate text-black flex-grow">
                    {songTitle}
                </p>
                <button className="bg-spotifyGreen hover:bg-[#1DD05D] text-white 
                w-12 h-12 rounded-full flex items-center justify-center 
                transition-colors duration-300 text-4xl flex-shrink-0 ml-4">
                    +
                </button>
            </div>
        </div>              
    );
}

export default SongCard;
