const clientId = 'c9ed8bd9d88641029f0d3ec68fec3403'; // your clientId
const redirectUrl = 'http://localhost:3000/';        // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private';

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() { return localStorage.getItem('access_token') || null; },
  get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  get expires_in() { return localStorage.getItem('refresh_in') || null },
  get expires() { return localStorage.getItem('expires') || null },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
  }
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  window.history.replaceState({}, document.title, updatedUrl);
}



async function redirectToSpotifyAuthorize() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  window.localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL(authorizationEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: currentToken.refresh_token
    }),
  });


  return await response.json();
}

async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

  return await response.json();
}

// Click handlers
async function loginWithSpotify() {
  await redirectToSpotifyAuthorize();
}

async function logoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);

}

let userData = {};
// If we have a token, we're logged in, so fetch user data and render logged in template
if (currentToken.access_token) {
  userData = await getUserData();
  localStorage.setItem('userId', userData.id)
}

// Otherwise we're not logged in, so render the login template
if (!currentToken.access_token) {

}

async function createPlaylist(playlistName, trackList) {
  const userId = localStorage.getItem('userId')
  const accessToken = currentToken.access_token
  const userEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
  const payload = {
      method:"POST",
      headers: { 
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
       },
      body: JSON.stringify({
          name: `${playlistName}`,
          description:'Description',
          public: false
      })
  }

  try {
      const response = await fetch(userEndpoint, payload);
      if(response.ok) {
        console.log('Playlist successfully created!');
      }
        
      if(trackList.length > 0) {
          const jsonResponse = await response.json();
          const playlistId = jsonResponse.id;
          const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
          const trackUris = trackList.map(track => track.uri);

          const payload = {
              method:"POST",
              headers: { 
                  'Authorization': 'Bearer ' + accessToken,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  uris: trackUris,
              })
          };

          try {
              console.log('Adding Tracks now');
              const response = await fetch(playlistEndpoint, payload);
              if (response.ok) {
                  console.log('Tracks added successfully!')
              }
              throw new Error(response.status);

          } catch(e) {
              console.log(e.message)
          }
      } else {
        console.log('Playlist Created with no Tracks')
      }
      
  } catch(e) {
      console.log(e.message)
  }
} 

async function getSearchResults(searchInput) {
  // Search Query
  const spotifyAPIbaseURL = "https://api.spotify.com/v1/search"
  const query = `?q=${searchInput}`
  const searchType = `&type=track`
  const urlToFetch = spotifyAPIbaseURL + query + searchType
  const options = {
      method: "GET",
      headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
  }

  try {
      const response = await fetch(urlToFetch, options)
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json()
      const topTen = [];
      for (let i = 0; i <= 10; i++){
          topTen.push(json.tracks.items[i])
      }
      return topTen
  } catch(e) {
      console.log(e.message)
  }
}

// Get users playlists
async function getUserPlaylists() {
  const playlistEndpoint = 'https://api.spotify.com/v1/me/playlists'
  const payload = {
    headers: {'Authorization': "Bearer " + currentToken.access_token},      
    }
  try {
    const response = await fetch(playlistEndpoint, payload);
    if(!response.ok){
      throw new Error('fetching playlists failed! Error: ' + response.status)
    }
    const json = await response.json()
    const userPlaylists = json.items;

    return userPlaylists

  } catch(e) {
    console.log(e.message)
  }
}

async function getPlaylistItems(playlistId) {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
  const payload = {
    headers: {'Authorization': "Bearer " + currentToken.access_token},      
    }
  try {
    const response = await fetch(endpoint, payload);
    if(!response.ok){
      throw new Error('fetching playlist items failed! Error: ' + response.status)
    }
    const json = await response.json()

    const playlistItems = json.items.map(track => track.track);
    return playlistItems;

  } catch(e) {
    console.log(e.message)
  }
}

async function addTracksToPlaylist(playlistId, trackList) {
  const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const trackUris = trackList.map(track => track.uri);

  const payload = {
      method:"POST",
      headers: { 
          'Authorization': 'Bearer ' + currentToken.access_token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          uris: trackUris,
      })
  };

  try {
      const response = await fetch(playlistEndpoint, payload);
      if (response.ok) {
          console.log('Tracks added successfully!')
      }
      throw new Error(response.status);

  } catch(e) {
      console.log(e.message)
  }

}

async function removeTracksFromPlaylist(playlistId, trackList) {
  const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const trackUris = trackList.map(track => { return {"uri":track.uri}});

  const payload = {
      method:"DELETE",
      headers: { 
          'Authorization': 'Bearer ' + currentToken.access_token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          tracks: trackUris,
      })
  };

  try {
      const response = await fetch(playlistEndpoint, payload);
      if (response.ok) {
          console.log('Tracks added successfully!')
      }
      throw new Error(response.status);

  } catch(e) {
      console.log(e.message)
  }
}


// Spotify object
const Spotify = {
  loginWithSpotify,
  refreshTokenClick,
  logoutClick,
  createPlaylist,
  getSearchResults,
  refreshToken,
  getUserPlaylists,
  getPlaylistItems,
  addTracksToPlaylist,
  removeTracksFromPlaylist,
  userData,
}

export default Spotify;