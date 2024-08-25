import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginPKCE } from '../View Model/Spotify.js';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = window.localStorage.getItem('access_token');
        const storedProfileImage = window.localStorage.getItem('profileImage');
        if (token) {
            setIsLoggedIn(true);
            if (storedProfileImage) {
                setProfileImage(storedProfileImage);
            }
        }
    }, []);

    const handleSignIn = () => {
        window.localStorage.setItem('returnPath', location.pathname);
        loginPKCE();
    };

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
                {isLoggedIn ? (
                    <img 
                        src={profileImage || '/path/to/default/image.png'} 
                        alt="Profile" 
                        className="w-[2.5vw] h-[2.5vw] rounded-full ml-auto cursor-pointer"
                    />
                ) : (
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
                    " onClick={handleSignIn}>
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;