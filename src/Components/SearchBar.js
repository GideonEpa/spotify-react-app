import React, { useState } from 'react';
import SearchResults from './SearchResults'
import TrackList from './TrackList';
import styles from '../Modules/SearchBar.module.css'

function SearchBar({onSubmit}){
    const [userInput, setUserInput] = useState("");

    function handleInput({target}){
        setUserInput(target.value);
    };

    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        setSearchInput(userInput);
    }

    const [trackList, setTrackList] = useState([])

    function addToTrackList(track){
        setTrackList(prev => [...prev, track])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name='search' value={userInput} onChange={handleInput} type="text" id="search"/> <br/>
                <input value='Search' type='submit'/>
            </form>
            

            <div className={styles.container}>
                <SearchResults searchInput={searchInput} addToTrackList={addToTrackList}/>
                <TrackList trackList={trackList} />
            </div>
        </>
    )
}

export default SearchBar;