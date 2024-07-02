import React, { useState, useEffect } from 'react';
import styles from '../Modules/Track.module.css'

function Track(props){
    function handleClick(){
        if (props.removeFromTrackList) {
            props.removeFromTrackList(props.track)
        } else {
            props.addToTrackList(props.track)
        }
    }
    return (
        <div className={styles.track}>
            <h3>{props.trackName}</h3>
            <h4>{props.trackArtist} | {props.trackAlbum}</h4>
            <button className={styles.btn} onClick={handleClick}>{props.removeFromTrackList ? "-" : "+"}</button>
        </div>

    )
};

export default Track;