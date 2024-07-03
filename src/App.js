import './App.css';
import React, {useState, useEffect} from 'react'
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import TrackList from './Components/TrackList';
import Login from './Components/Login';

import { loginWithSpotify, logoutClick, userData } from './Modules/authorization';


function App() {
  useEffect(() => {
    if(!localStorage.hasOwnProperty('access_token'))
      loginWithSpotify();
  }, [])

  const accessToken = localStorage.getItem('access_token');

  const[searchInput, setSearchInput] = useState();
  const[trackList, setTrackList] = useState([]);

  function addToTrackList(track) {
    if (!trackList.includes(track)) {
      setTrackList(prev => [...prev, track])
    }
  };

  function removeFromTrackList(track){
    setTrackList(trackList.filter((arrTrack) => arrTrack !== track))
  };
  
  

  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput}/>
      <Login logout={logoutClick}/>
      <div className="list-container">
        <SearchResults accessToken={accessToken} searchInput={searchInput} addToTrackList={addToTrackList}/>
        <TrackList trackList={trackList} removeFromTrackList={removeFromTrackList} userData={userData} accessToken={accessToken}/>
      </div>
    </div>
  );
}

export default App;
