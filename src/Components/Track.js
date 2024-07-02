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
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 10px",
            borderBottom: "1px solid white"
            }}>
            <h3>{props.trackName}</h3>
            <h4>{props.trackArtist} | {props.trackAlbum}</h4>
            <button className={styles.btn} onClick={handleClick}>{props.removeFromTrackList ? "-" : "+"}</button>
        </div>

    )
};

export default Track;