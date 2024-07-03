import React, { useState } from 'react';
import Track from './Track';
import styles from '../Modules/TrackList.module.css';
import createPlaylist from '../Modules/createPlaylist';



function TrackList({trackList, removeFromTrackList, userData, accessToken}){
    const [userInput, setUserInput] = useState("Playlist");

    function handleChange({target}){
        setUserInput(target.value)
    };

    function handleClick() {
        createPlaylist(userData.id, accessToken, userInput, trackList);

    }

    return (
        <>
        <div className={styles.trackList}>
            <input name='playlist' onChange={handleChange} className={styles.playlistInput} value={userInput} />
            {trackList.map((track) => {
                return <Track track={track} trackName={track.name} trackAlbum={track.album.name} trackArtist={track.artists[0].name} removeFromTrackList={removeFromTrackList} />
                }
            )}
        </div>
        <button onClick={handleClick} className={styles.saveBtn}>Save To Spotify</button>
        </>
    )
}

export default TrackList;