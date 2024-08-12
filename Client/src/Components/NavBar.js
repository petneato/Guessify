import React from "react";
import { loginPKCE } from '../View Model/Spotify.js'

const NavBar = () => {
    return (
        <nav className="bg-spotifyBlack text-spotifyWhite py-4 w-[100%]">
            <div className="  flex justify-between items-center">
                <div className="text-2xl font-bold ml-4 mr-auto">
                    <a href="/">Guessify</a>
                </div>
                <ul className="flex space-x-6">
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
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    cursor-pointer
                    transition-colors
                    duration-300
                    ml-auto
                    mr-4
                " onClick={loginPKCE}>
                    Sign In
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
