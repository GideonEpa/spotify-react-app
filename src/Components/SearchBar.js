import React, { useState } from 'react';
import SearchResults from './SearchResults'

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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name='search' value={userInput} onChange={handleInput} type="text" id="search"/> <br/>
                <input value='Search' type='submit'/>
            </form>
            

            <div>
                <SearchResults searchInput={searchInput}/>
            </div>
        </>
    )
}

export default SearchBar;