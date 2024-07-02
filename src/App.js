import './App.css';
import React, {useState} from 'react'
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import TrackList from './Components/TrackList';

function App() {
  const[searchInput, setSearchInput] = useState();

  const[trackList, setTrackList] = useState([]);

  function addToTrackList(track){
    setTrackList(prev => [...prev, track])
  }

  function removeFromTrackList(track){
    setTrackList(trackList.filter((arrTrack) => arrTrack !== track))
  }


  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput}/>
      <div className="list-container">
        <SearchResults searchInput={searchInput} addToTrackList={addToTrackList}/>
        <TrackList trackList={trackList} removeFromTrackList={removeFromTrackList} />
      </div>
    </div>
  );
}

export default App;
