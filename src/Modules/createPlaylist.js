async function createPlaylist(userId, accessToken, playlistName, trackList) {
    const userEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
    const payload = {
        method:"POST",
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            name: `${playlistName}`,
            description:'Test',
            public: false
        })
    }

    try {
        const response = await fetch(userEndpoint, payload);
        if (response.ok) {
            console.log('Playlist successfully created!')
            console.log('Adding Tracks now')

            console.log(response)
            const playlistId = new URLSearchParams(response.uri)
            const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
            const tracksToAdd = new URLSearchParams(trackList.map(track => track.uri).join())
            console.log(tracksToAdd);


            const payload = {
                method:"POST",
                headers: { 
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                 },
                body: JSON.stringify({
                    uris: 'spotify%3Atrack%3A28wtiGfwWVdxbZDW52S3kz',
                    position: 0
                })
            };

            console.log(playlistEndpoint, payload)

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
        throw new Error(response.status)
    } catch(e) {
        console.log(e.message)
    }
} 

export default createPlaylist;