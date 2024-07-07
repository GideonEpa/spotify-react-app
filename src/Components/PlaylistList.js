import styles from '../Modules/PlaylistList.module.css'

function PlaylistList({
    userPlaylists,
    changePlaylist
    }) {

    function handleClick(playlistId, playlistName){
        changePlaylist(playlistId, playlistName);
    }

    if(userPlaylists){
        return (
            <div 
                className={styles.playlistListContainer}>
                    <h2>Playlists</h2>
                    <div className={styles.playlistShowcase}>
                        <div onClick={() => handleClick(0, "")} id='new-playlist' className={styles.playlistCard}>
                            <p>+</p>
                            <h4>New Playlist</h4>
                        </div>
                    {userPlaylists.map((playlist, i) => {
                        return (
                        <div key={playlist.name + ": " + i} onClick={() => handleClick(playlist.id, playlist.name)} className={styles.playlistCard}>
                            <img 
                                width='60' 
                                height='60' 
                                src={
                                    playlist.images !== null ? playlist.images[0].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2" 
                                }
                                alt={playlist.name}
                                />
                            <h4>{playlist.name}</h4>
                        </div>
                        )
                        })}
                        
                    </div>

            </div>
        )
    }
}

export default PlaylistList;