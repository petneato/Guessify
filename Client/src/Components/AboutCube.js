import React from "react";

const AboutCube = ({ heading, content }) => { 
    return (
        <div className="w-full h-full bg-spotifyBlack rounded-xl my2 flex flex-col">
            <h1 className="text-white text-4xl m-4 text-center">{heading}</h1>
            <div className="flex-grow px-8 pb-4 flex flex-col">
                <p className="text-white text-lg h-full max-h-full text-wrap truncate break-all">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default AboutCube;
