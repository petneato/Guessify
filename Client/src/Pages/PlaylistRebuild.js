import React from "react";
import StyledButton from "../Components/StyledButton.js";
import PlaylistCard from "../Components/PlaylistCard.js"
import img from "../Images/Guessify.png"

const PlaylistRebuild = () => { 
    const cards = [];
    const numberOfCards = 20; // Specify how many cards you want

    for (let i = 1; i <= numberOfCards; i++) {
        cards.push(
            <PlaylistCard 
                key={i}
                PlaylistCover={img} 
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
                    text-spotifyWhite
                ">
                    Select a Playlist
                </h1>
            </div>

            <div className="custom-scrollbar flex flex-wrap justify-center gap-12 overflow-y-auto w-full flex-grow p-4 max-h-[72vh]" >
                {cards}
                <PlaylistCard playlistName=""/>
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
                    px-16
                    py-4
                    rounded-3xl
                ">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PlaylistRebuild;
