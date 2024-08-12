//Reorganizing some of the spotify api features and other helper functions for readability etc

export const getProfile = async (accessToken) => {

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}

export const getPlaylist = async (accessToken, playlistURI) => {

    const response = await fetch('https://api.spotify.com/v1/playlists/'+playlistURI, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}

export const getAllPlaylist = async (acessToken) => {
    let offset = 0;
    let allPlaylists = [];

    while(true) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`, {
                headers: {
                    Authorization: 'Bearer ' + acessToken
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            allPlaylists = allPlaylists.concat(data.items); // Merging the fetched playlists

            // If there are no more playlists, break the loop
            if (!data.next) {
                break;
            }

            // If there are more playlists, increment the offset by 50 for the next call
            offset += 50;

        } catch (error) {
            console.error(`Fetch Error: ${error}`);
            return [];
        }
    }
    
    return allPlaylists;
}

export const getTracks = async (accessToken, track) => {

    const response = await fetch(track, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    return await response.json();
}