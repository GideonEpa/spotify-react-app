import React from 'react';
import Track from './Track';
import styles from '../Modules/TrackList.module.css'

function TrackList({trackList}){
    return (
        <div className={styles.trackList}>
            {trackList.map((track) => {
                return <Track track={track} trackName={track.name} trackAlbum={track.album.name} trackArtist={track.artists[0].name}/>
                }
            )}     
        </div>
    )
}

export default TrackList;