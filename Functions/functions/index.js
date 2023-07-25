/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onValueCreated} = require("firebase-functions/v2/database");
const {logger} = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Fetch Spotify tracks based on the provided href
const getHref = async (href) => {
    let song = (async () => {
        if (token !== '') {
            return await getTracks(token, href);
        }
    })();

    song = await song; // This line will wait for the promise to resolve and then assign the resolved value to the song variable
    console.log(song); // This line will print the resolved value to the console

    let uris = song.items.map(item => item.track.uri);
    console.log(uris);

    return uris;
}

// Randomly select songs from the user's playlists for the game
const getRandomHelper = async (numSongs) => {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let selectedSongs = {};

    for (let user of tracks) {
        let userPlaylists = Object.values(user.playlists);
        shuffleArray(userPlaylists);

        selectedSongs[user.user] = [];

        for (let i = 0; i < userPlaylists.length; i++) {
            let songs = await getHref(userPlaylists[i]);
            shuffleArray(songs);
            
            while (songs.length > 0 && selectedSongs[user.user].length < numSongs) {
                selectedSongs[user.user].push(songs.pop());
            }

            if (selectedSongs[user.user].length === numSongs) {
                break;
            }
        }
    }

    return selectedSongs;
}

exports.playgame = oncall((request) => {
    const uid = request.auth.uid;
    const songs = request.data.text;
    const db = admin.database;

    const numRoundsRef = ref(db, code + '/rounds')
    const songsRef = ref(db, code + '/songs')

    let numSongs;
    let numRounds;

    get(numRoundsRef).then((snapshot) => {
        if (snapshot.exists()) {
            numRounds = snapshot.val();
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    get(songsRef).then((snapshot) => {
        if (snapshot.exists()) {
            numSongs = snapshot.val();
            getRandomHelper(numSongs).then(result => console.log(result)); // Moved inside .then
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
