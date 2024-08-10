import React from "react";

const NavBar = () => {
    return (
        <nav className="bg-spotifyBlack text-spotifyWhite py-4 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    MyApp
                </div>
                <ul className="flex space-x-6">
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="#home">Home</a>
                    </li>
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="#playlists">Playlists</a>
                    </li>
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="#about">About</a>
                    </li>
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="#contact">Contact</a>
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
                ">
                    Sign In
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
