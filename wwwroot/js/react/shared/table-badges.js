import React from 'react';

export function ToDo(props) {
    if(props.toDo !== true)
        return null;

    return <span className='tbl-bdg todo'>To Do</span>;
}

export function Favorite(props) {
    if(props.favorite !== true)
        return null;

    return <span className='tbl-bdg fav'>Favorite</span>;
}

export function Owner(props) {
    if(props.owner !== true)
        return null;

    return <span className='tbl-bdg owner'>Owner</span>;
}

export function Inactive(props) {
    if(props.active === true)
        return null;

    return <span className='tbl-bdg inactive'>Inactive</span>;
}