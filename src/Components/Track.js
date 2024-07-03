import React from 'react';
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
        <div className={styles.trackCard}>
            <img src={props.trackSrc} width={100} height="auto"/>
            <div className={styles.text}>
                <h3>{props.trackName}</h3>
                <h4>{props.trackArtist} | {props.trackAlbum}</h4>
            </div>
            <button className={styles.btn} onClick={handleClick}>{props.removeFromTrackList ? "-" : "+"}</button>
        </div>

    )
};

export default Track;