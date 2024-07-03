import React, { useState } from 'react';
import styles from '../Modules/SearchBar.module.css'

function SearchBar({setSearchInput}){
    const [userInput, setUserInput] = useState("");

    function handleInput({target}){
        setUserInput(target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        setSearchInput(userInput);
    }

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input className={styles.searchField} name='search' value={userInput} onChange={handleInput} type="text" id="search"/> <br/>
                <input className={styles.searchBtn} value='Search' type='submit'/>
            </form>
        </>
    )
}

export default SearchBar;