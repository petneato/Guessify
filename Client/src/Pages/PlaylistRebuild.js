import React from "react";
import StyledButton from "../Components/StyledButton.js";
import PlaylistCard from "../Components/PlaylistCard.js"

const PlaylistRebuild = () => { 
    const cards = [];
    const numberOfCards = 20; // Specify how many cards you want

    for (let i = 1; i <= numberOfCards; i++) {
        cards.push(
            <PlaylistCard 
                key={i}
                PlaylistCover={`../Images/Guessify.png`} 
                playlistName={`Playlist ${i}`} 
                onClick={() => console.log(`Playlist ${i} clicked`)} 
            />
        );
    }

    return (
        <div className="h-[100vh] flex flex-col items-center bg-[#696464] p-4">
            <div className="
                text-center
                w-full
                py-2
            ">
                <h1 className="
                    text-6xl
                    font-bold
                ">
                    Select a Playlist
                </h1>
            </div>

            <div className="custom-scrollbar flex flex-wrap justify-center gap-6 overflow-y-auto w-full flex-grow p-4" style={{ maxHeight: '82%' }}>
                {cards}
            </div> 

            <div className="
                text-center
                w-full
                py-4
                flex-shrink-0
            ">
                <button className="
                    bg-spotifyGreen
                    hover:bg-spotifyHoverGreen
                    text-spotifyWhite
                    text-xl
                    px-[25px]
                    py-[10px]
                    rounded-3xl
                ">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PlaylistRebuild;
