import './App.css';
import React, {useState, useEffect} from 'react'
import SearchBar from './Components/SearchBar.js';
import SearchResults from './Components/SearchResults.js';
import TrackList from './Components/TrackList.js' 
import Login from './Components/Login.js';

import Spotify from './Spotify.js';


function App() {
  // Authorise User login
  useEffect(() => {
    if(!localStorage.hasOwnProperty('access_token'))
      Spotify.loginWithSpotify();
  }, [])
  console.log(Spotify.userData)

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
  const[playlistName, setPlaylistName] = useState("Playlist Name")
  function renamePlaylist({target}) {
    setPlaylistName(target.value)
  }
  
  function savePlaylist() {
    if (playlistName !== "Playlist Name") {
      Spotify.createPlaylist(
        Spotify.userData.id, 
        accessToken, 
        playlistName.trim(), 
        trackList);

      setTimeout(() => {
        alert(`Your playlist titled '${playlistName}' was saved to your account successfully!`)
      }, 500);

      setTrackList([])
      setPlaylistName("Playlist Name")
    } else {
        alert('You forgot to name your playlist!')
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <div>
         <img src=''/>
        </div>
        <div className='title-text'>
          <h1 className='title'>Muse</h1>
          <p className='subtitle'>powered by Spotify</p>
        </div>
        {accessToken &&
        <Login 
          className= 'login' 
          logout={Spotify.logoutClick}
          userData={Spotify.userData}
          />
        }
      </div>
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
          />
      </div>
    </div>
  );
}

export default App;
