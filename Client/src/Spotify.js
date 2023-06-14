var client_id = 'd9f97736297e4a039202cb31e162c0ef';
var redirect_uri = 'http://localhost:3000/callback';

function login(){
    var state = 'test';
    var stateKey = 'test';

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    console.log(url);
    window.open(url);
}