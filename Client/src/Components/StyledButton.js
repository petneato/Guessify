import React from "react";

const StyledButton = (text, w, h) => {
    return (
        <button className="
            bg-spotifyGreen
            hover:bg-spotifyHoverGreen
            text-spotifyWhite

            h-2em
            rounded-3xl
            
        ">
            {text.text}
        </button>
    );
}

export default StyledButton