import React from 'react';
import Track from './Track';
import styles from '../Modules/TrackList.module.css'

function TrackList({trackList, removeFromTrackList}){
    return (
        <div className={styles.trackList}>
            <h2>Tracklist</h2>
            {trackList.map((track) => {
                return <Track track={track} trackName={track.name} trackAlbum={track.album.name} trackArtist={track.artists[0].name} removeFromTrackList={removeFromTrackList}/>
                }
            )}
            <button>Save Playlist</button>     
        </div>
    )
}

export default TrackList;