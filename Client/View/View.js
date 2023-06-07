import React, { useEffect, useState } from "react";

import "Client\View\view.css"

class view {
    
    constructor(CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE) {
        this.CLIENT_ID = CLIENT_ID;
        this.REDIRECT_URI = REDIRECT_URI;
        this.AUTH_ENDPOINT = AUTH_ENDPOINT;
        this.RESPONSE_TYPE = RESPONSE_TYPE;

    }

    start() {
        return (
            <div>
                <header>
                    <div>
                        <h1>Guessify</h1>
                        <h3>Spotify Guessing Game</h3>
                    </div>
                    
                    <div>
                        <img src={spotifyLogo} alt="Spotify Logo" />
                    </div>
                    
                    
                    <div>
                        <p>Connect your Spotify account to start playing!</p>
                        <button><a href="">Play Now</a></button>
                    </div>
                </header>
            </div>
        );
    }
}