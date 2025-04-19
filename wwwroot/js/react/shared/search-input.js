import React, { useState } from 'react';

export default function SearchInput(props) {

    let [searchValue, setSearchValue] = useState(props.value);

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.onUpdate(searchValue);
        }
    }

    const updateSearchValue = (event) => {
        setSearchValue(event.target.value);

        if (props.value !== ''
            && event.target.value === ''
            && searchValue.length !== 1) {
            props.onUpdate('');
        }
    }

    return <input   type="search"
                    placeholder='Search' 
                    value={searchValue} 
                    onChange={(event)=>(updateSearchValue(event))}
                    onKeyDown={onKeyDown}/>
}