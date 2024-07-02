import React, { useState, useEffect } from 'react';
import styles from '../Modules/Track.module.css'

function Track(props){
    function handleClick(){
        props.addToTrackList(props.track)

    }

    return (
        <div className={styles.track}>
            <h2>{props.trackName}</h2>
            <h3>{props.trackArtist} | {props.trackAlbum}</h3>
            <button className={styles.btn} onClick={handleClick}>+</button>
        </div>

    )
};

export default Track;