import React from 'react';
import styles from '../Modules/Track.module.css'

function Track({
    track,
    removeFromTrackList,
    addToTrackList
    }) {

    const trackName = track.name;
    const trackAlbum = track.album.name;
    const trackArtist = track.artists[0].name;
    const trackSrc = track.album.images[0].url;

    function handleClick(){
        if (removeFromTrackList) {
            removeFromTrackList(track)
        } else {
            addToTrackList(track)
        }
    }
    
    return (
        <div className={styles.trackCard}>
            <img 
                src={trackSrc} 
                width={100} 
                height="auto"
                />
            <div className={styles.text}>
                <h3>{trackName}</h3>
                <h4>{trackArtist} | {trackAlbum}</h4>
            </div>
            <button 
                className={styles.btn} 
                onClick={handleClick}
                >{removeFromTrackList ? "-" : "+"}</button>
        </div>
    )
};

export default Track;