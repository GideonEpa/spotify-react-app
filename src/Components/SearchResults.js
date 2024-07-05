import React, { useEffect, useState } from 'react';
import Track from './Track.js';
import styles from '../Modules/SearchResults.module.css'


function SearchResults({
    addToTrackList,
    searchResults
    }) {

    return (
        <div className={styles.searchResults}>
            <h2 className={styles.h2}>Results</h2>
            {searchResults.map((track, index) => {
                return <Track 
                            key={"Result: " + index}
                            track={track} 
                            addToTrackList={addToTrackList} 
                             />
                }
            )}            
        </div>
    )
}

export default SearchResults;