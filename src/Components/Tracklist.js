import React, { useState } from 'react';
import Track from './Track';
import styles from '../Modules/TrackList.module.css';


function TrackList({trackList, removeFromTrackList, setPlaylistName}){
    const [userInput, setUserInput] = useState("Playlist");

    function handleChange({target}){
        setUserInput(target.value)
    };

    return (
        <div className={styles.trackList}>
            <input onSubmit={setPlaylistName} onChange={handleChange} className={styles.playlistInput} value={userInput} name='playlist'/>
            {trackList.map((track) => {
                return <Track track={track} trackName={track.name} trackAlbum={track.album.name} trackArtist={track.artists[0].name} removeFromTrackList={removeFromTrackList}/>
                }
            )}
            <button className={styles.saveBtn}>Save To Spotify</button>     
        </div>
    )
}

export default TrackList;