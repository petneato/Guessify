const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello");
});

//127.0.0.1:5001/guessify-467fb/us-central1/newGame?name=test&ID=Q&rounds=1&songs=1
//https://newgame-qhr4bnfypq-uc.a.run.app?name=test&ID=Q&rounds=1&songs=1
exports.newGame = onRequest((request, response) => {
    const headers = request.headers;

    if (!headers.name || !headers.id || !headers.numrounds || !headers.numsongs) {
        response.status(400).send('Missing required headers');
        return;
    }

    const name = headers['name'];
    const creatorID = headers['id'];
    const numRounds = headers['numrounds'];
    const numSongs = headers['numsongs'];

    const gameRef = admin.database().ref(name + '/');

    return gameRef.set({ name: name, creator: creatorID, songs: numSongs, rounds: numRounds})
    .then(() => {
        logger.info(creatorID + " created game with name: " + name);
        response.send('game created');
    })
    .catch((error) => {
        response.status(500).send('error creating game' + error);
    });

});

exports.addPlaylist = onRequest( async (request, response) => {
    const headers = request.headers;

    if (!headers.name || !headers.playlisturi) {
        response.status(400).send('Missing required headers');
        return;
    }

    const name = headers['name'];
    const playlistURI = headers['playlisturi']

    const gameRef = admin.database().ref(name + '/playlists/');
    const snapshot = await gameRef.once('value');
    let currentArray = snapshot.val() || [];

    currentArray.push(playlistURI);

    return gameRef.set(currentArray)
    .then(() => {
        response.send('playlist added');
    })
    .catch((error) => {
        response.status(500).send('error adding playlist' + error);
    });
    
});

exports.joinGame = onRequest((request, response) => {
    
});

exports.getRandom = onRequest((request, response) => {
    
});

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


// Determine how many songs to select based on the number of rounds
const getRandom = async () => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

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
}

const loadRound = async () => {

}

const createPlaylist = async () => {

}

const setScore = async () => {

}

const createGame = async (name) => {
  
    const auth = getAuth();
    const res = await signInAnonymously(auth);
    if (!res) {
      console.log('Sign in failed');
      return;
    }
  
    const db = getDatabase();
  
    const gameRef = ref(db, name);
    const snapshot = await get(gameRef);
  
    if (snapshot.exists()) {
      console.log('Game already exists');
      return;
    }
  
    // set game name and creator
    await set(gameRef, { name: name, creator: res.user.uid });
  
    // // set tracks as a child node
    // const creatorRef = child(gameRef, 'creator');

    // //set uID of creator
    // const uID = child(creatorRef, 'uID')
    // await set(uID, res.user.uid)

    // //Set the tracks for the creator
    // for(let i = 0; i < tracks.length; i++){
    //   let trackRef = child(creatorRef, `track${i+1}`);
    //   await set(trackRef, tracks[i])
    // }

    // create Users node under the game
    const usersRef = child(gameRef, 'users');

    // Check how many children (users) there are currently
    let count = 0;
    const usersSnapshot = await get(usersRef);
    if (usersSnapshot.exists()) {
      count = Object.keys(usersSnapshot.val()).length;
    }
  
    // Increment the count and use it as the new user ID
    let userRef = child(usersRef, `uID${count + 1}`);
    await set(userRef, res.user.uid);

    // set tracks as a child node
    const creatorRef = child(gameRef, res.user.uid);
    for(let i = 0; i < tracks.length; i++){
      let trackRef = child(creatorRef, `track${i+1}`);
      await set(trackRef, tracks[i])
    }
    
    console.log("User added to the game");
    

    // set rounds as a child node with three more branches
    const roundsRef = child(gameRef, 'rounds');
    await set(roundsRef, rounds);

    const songsPerPlayerRef = child(gameRef, 'songs')
    await set(songsPerPlayerRef, songsPerPlayer)

      
      console.log('No errors');
      window.localStorage.setItem('uID', res.user.uid);
      window.localStorage.setItem('code', name);
      window.location.href = "game";
      return;
}