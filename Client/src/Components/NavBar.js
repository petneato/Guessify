import React from "react";
import { loginPKCE } from '../View Model/Spotify.js'

const NavBar = () => {
    return (
        <nav className="bg-spotifyBlack text-spotifyWhite py-[1vw] w-full">
            <div className="flex justify-between items-center px-[2.5vw]">
                <div className="text-[2.5vw] font-bold mr-auto">
                    <a href="/">Guessify</a>
                </div>
                <ul className="flex space-x-[2vw] text-[1.2vw]">
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="/playlists">Playlists</a>
                    </li>
                </ul>
                <button className="
                    bg-spotifyGreen
                    hover:bg-[#1DD05D]
                    text-white
                    px-[1.5vw]
                    py-[0.75vw]
                    rounded-full
                    text-[1vw]
                    cursor-pointer
                    transition-colors
                    duration-300
                    ml-auto
                " onClick={loginPKCE}>
                    Sign In
                </button>
            </div>
        </nav>
    );
}

export default NavBar;