import React from "react";

const AboutCube = ({ heading, content }) => { 
    return (
        <div className="w-full h-full bg-spotifyBlack rounded-[1vw] my-[0.5vw] flex flex-col">
            <h1 className="text-white text-[2vw] m-[1vw] text-center">{heading}</h1>
            <div className="flex-grow px-[2vw] pb-[1vw] flex flex-col">
                <p className="text-white text-[1vw] h-full max-h-full text-wrap truncate break-all">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default AboutCube;