import React from 'react';

export default function Alias(props) {
    if(props.alias === null || props.alias === undefined || props.alias === '')
        return null;

    return <span title={props.alias} className='l-als'>{props.alias}</span>;
}