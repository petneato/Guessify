import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginPKCE, getUserProfile, signOut } from '../View Model/Spotify.js';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = window.localStorage.getItem('access_token');
            if (token) {
                setIsLoggedIn(true);
                const profile = await getUserProfile();
                if (profile && profile.images && profile.images.length > 0) {
                    setProfileImage(profile.images[0].url);
                    window.localStorage.setItem('profileImage', profile.images[0].url);
                }
            } else {
                setIsLoggedIn(false);
                setProfileImage(null);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignIn = () => {
        window.localStorage.setItem('returnPath', location.pathname);
        loginPKCE();
    };

    const handleSignOut = async () => {
        await signOut();
        setIsLoggedIn(false);
        setProfileImage(null);
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <nav className="bg-spotifyBlack text-spotifyWhite py-[1vw] w-full relative">
            <div className="flex justify-between items-center px-[2.5vw]">
                <div className="text-[2.5vw] font-bold">
                    <a href="/">Guessify</a>
                </div>
                <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-[2vw] text-[1.2vw]">
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-spotifyGreen transition-colors duration-300">
                        <a href="/playlists">Playlists</a>
                    </li>
                </ul>
                <div className="ml-auto">
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <img 
                                src={profileImage || '/path/to/default/image.png'} 
                                alt="Profile" 
                                className="w-[2.5vw] h-[2.5vw] rounded-full cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-spotifyBlack rounded-md shadow-lg py-1 z-10">
                                    <button
                                        onClick={handleSignOut}
                                        className="block w-full text-left px-4 py-2 text-sm text-spotifyWhite hover:bg-gray-800"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
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
                        " onClick={handleSignIn}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;