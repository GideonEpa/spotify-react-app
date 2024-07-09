import './App.css';
import React, {useState, useEffect} from 'react'
import SearchBar from './Components/SearchBar.js';
import SearchResults from './Components/SearchResults.js';
import TrackList from './Components/TrackList.js'; 
import Login from './Components/Login.js';
import PlaylistList from './Components/PlaylistList.js';

// Import spotify methods from spotify.js
import Spotify from './Modules/Spotify.js';


function App() {
 
  useEffect(() => {
    // prompt User login if not currently logged in
    if(!localStorage.hasOwnProperty('access_token')){
      Spotify.loginWithSpotify();
    }

    // Refresh token if current token has expired
    const currentTime = new Date()
    if(currentTime.getTime() > new Date(localStorage.getItem('expires')).getTime()){
      Spotify.refreshToken();
    }
  }, [])
  const accessToken = localStorage.getItem('access_token');

  // Search bar and search results functionality
  const [searchResults, setSearchResults] = useState([])
  
  async function submitSearch(searchInput) {
    if (searchInput && searchInput.trim().length > 0) {
      const results = await Spotify.getSearchResults(searchInput.trim())
      setSearchResults(results)
    } else {
      alert('Please Enter a Song!')
    }
  }

  // Tracklist add and remove
  const[trackList, setTrackList] = useState([]);
  function addToTrackList(track) {
    if (!trackList.includes(track)) {
      setTrackList(prev => [...prev, track])
    }
  };

  function removeFromTrackList(track){
    setTrackList(trackList.filter((arrTrack) => arrTrack !== track))
  };
  
  // Playlist Actions
  const[playlistName, setPlaylistName] = useState("New Playlist")
  function renamePlaylist({target}) {
    setPlaylistName(target.value)
  }

  // Get User Playlist 
  const [userPlaylists, setUserPlaylists] = useState("")

  useEffect(() => {
    async function fetchPlaylists() {
      const returnedPlaylists = await Spotify.getUserPlaylists();
      setUserPlaylists(returnedPlaylists)
    }
    fetchPlaylists();
  },[playlistName])

  const [isEditing, setIsEditing] = useState(false)
  
  function savePlaylist() {
    if (!isEditing) {
      if (playlistName !== "New Playlist") {
        Spotify.createPlaylist(  
          playlistName.trim(), 
          trackList);
  
        setTimeout(() => {
          alert(`Your playlist titled '${playlistName}' was saved to your account successfully!`)
        }, 500);
  
        setTrackList([])
        setPlaylistName("New Playlist")
      } else {
          alert('You forgot to name your playlist!')
      }
    } else {
        const tracksToAdd = trackList.filter(x => !playlistSnapshot.includes(x))
        if (tracksToAdd.lenght > 0) {
          Spotify.addTracksToPlaylist(
            currentPlaylist,
            tracksToAdd
          )
        } 
        

        const tracksToRemove = playlistSnapshot.filter(x => !trackList.includes(x))
        if(tracksToRemove.length > 0) {
          Spotify.removeTracksFromPlaylist(
            currentPlaylist,
            tracksToRemove
          )
        }
        


        setTimeout(() => {
          alert(`Your playlist titled '${playlistName}' was updated successfully!`)
        }, 500);
        setTrackList([])
        setPlaylistName("New Playlist")
    }
  }

  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [playlistSnapshot, setPlaylistSnapshot] = useState()

  async function changePlaylist(playlistId, playlistName) {
    if(playlistId === 0 || playlistName === "") {
      setIsEditing(false)
      setTrackList([])
      setPlaylistName('New Playlist')
    } else {
      setCurrentPlaylist(playlistId)
      setIsEditing(true)

      const newTracklist = await Spotify.getPlaylistItems(playlistId);
      setPlaylistSnapshot(newTracklist)
      setTrackList(newTracklist)
      setPlaylistName(playlistName)
    }

  }

  return (
    <div className="App">
      <div className="App-header">
        <div className='Spotify-logo'>
         <img 
          src='https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Logo.png' alt='placeholder'
          width='auto'
          height={80}
          />
        </div>
        <div className='title-text'>
          <h1 className='title'>Muse</h1>
          <p className='subtitle'>Powered by Spotify</p>
        </div>
        {accessToken &&
        <Login 
          className= 'login' 
          logout={Spotify.logoutClick}
          userData={Spotify.userData}
          />
        }
      </div>
      <PlaylistList 
        userPlaylists={userPlaylists}
        changePlaylist={changePlaylist} 
        />
      <SearchBar 
        submitSearch={submitSearch}
        />
      
      <div className="main">
        <SearchResults 
          addToTrackList={addToTrackList}
          searchResults={searchResults}
          />
        <TrackList 
          trackList={trackList} 
          removeFromTrackList={removeFromTrackList} 
          savePlaylist={savePlaylist}
          renamePlaylist={renamePlaylist}
          playlistName={playlistName}
          currentPlaylist={currentPlaylist}
          />
      </div>
    </div>
  );
}

export default App;
