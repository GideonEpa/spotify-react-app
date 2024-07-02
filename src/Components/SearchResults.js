import React, { useEffect, useState } from 'react';
import Track from './Track';
import styles from '../Modules/SearchResults.module.css'

async function getToken(){
    const clientId = "c9ed8bd9d88641029f0d3ec68fec3403";
    const clientSecret = "861ab1e85f904239bb6e3692bd97cf59";
    const tokenURL = "https://accounts.spotify.com/api/token"
    const options = {
        method:"POST",
        headers: {"content-type":"application/x-www-form-urlencoded"},
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    }

    try {
        const response = await fetch(tokenURL, options)
        if (!response.ok){
            throw new Error(`Request failed: ${response.status}`)
        }

        const json = await response.json();
        return json;
    } catch(e) {
        console.log(e.message)
    }
}

function SearchResults({searchInput, addToTrackList}){
    const[tracks, setTracks] = useState([])

    useEffect(() => {
        async function getSearchResults(input) {
            if (searchInput) {
                // Get Credentials
                const credentials = await getToken();
                const tokenType = credentials['token_type'];
                const accessToken = credentials['access_token'];
            
                // Search Query
                const spotifyAPIbaseURL = "https://api.spotify.com/v1/search"
                const query = `?q=${input}`
                const searchType = `&type=track`
                const urlToFetch = spotifyAPIbaseURL + query + searchType
                const options = {
                    method: "GET",
                    headers: {"Authorization": tokenType + " " + accessToken}
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
                    setTracks(topTen)    
                } catch(e) {
                    console.log(e.message)
                }
            }
        }
        
        getSearchResults(searchInput)
    }, [searchInput])


    return (
        <div className={styles.searchResults}>
            <h2>Results</h2>
            {tracks.map((track) => {
                return <Track addToTrackList={addToTrackList} track={track} trackName={track.name} trackAlbum={track.album.name} trackArtist={track.artists[0].name}/>
                }
            )}            
        </div>
    )

    
    
}

export default SearchResults;