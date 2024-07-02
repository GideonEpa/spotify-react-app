import './App.css';
import React, {useState, useEffect} from 'react'
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import TrackList from './Components/TrackList';
import authorize from './authorization';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('access_token')){
      authorize();
    }
  }, [])

  const accessToken = localStorage.getItem('access_token');

  const[searchInput, setSearchInput] = useState();
  const[trackList, setTrackList] = useState([]);

  function addToTrackList(track){
    setTrackList(prev => [...prev, track])
  };

  function removeFromTrackList(track){
    setTrackList(trackList.filter((arrTrack) => arrTrack !== track))
  };

  const[playlistName, setPlaylistName] = useState("");
  
  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput}/>
      <div className="list-container">
        <SearchResults accessToken={accessToken} searchInput={searchInput} addToTrackList={addToTrackList}/>
        <TrackList trackList={trackList} removeFromTrackList={removeFromTrackList} setPlaylistName={setPlaylistName}/>
      </div>
    </div>
  );
}

export default App;
