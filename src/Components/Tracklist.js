import Track from './Track.js';
import styles from '../Modules/TrackList.module.css';

function TrackList({
    trackList, 
    removeFromTrackList,
    savePlaylist,
    renamePlaylist,
    playlistName,
    }) {
    
    return (
        <div className={styles.trackList}>
            <input 
                name='playlist' 
                onChange={renamePlaylist} 
                className={styles.playlistInput} 
                value={playlistName}
                autoComplete='off' 
                />
            {trackList.map((track, index) => {
                return <Track 
                            key={"Track: " + index} 
                            track={track}  
                            removeFromTrackList={removeFromTrackList} 
                             />
                }
            )}
            <button 
                onClick={savePlaylist} 
                className={styles.saveBtn}>Save To Spotify</button>
        </div>
    )
}

export default TrackList;