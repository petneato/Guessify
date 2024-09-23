import React from 'react'

const GameContainer = ({ children }) => {
    return (
        <div id='game-container' className='flex flex-col items-center p-[1.75%] bg-spotifyBlack w-[40%] h-[90%] rounded-xl m-auto'>
            {children}
        </div>
    )
}

export default GameContainer