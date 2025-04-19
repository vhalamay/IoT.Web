import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Lnk(props) {
    if(props.hide === true)
        return null;

    let title = props.title ?? props.text;

    let count = null;
    if(props.count !== undefined)
    {
        count = <span className="cnt">{formatNumber(props.count)}</span>;
        title += ': ' + props.count;
    }


    let className = props.isBtn === true ? 'l-btn' : 'l-lnk';
    if(props.className !== undefined)
        className += ' ' + props.className;

    let icon = props.icon === undefined ? null : <span><FontAwesomeIcon icon={props.icon} /></span> 

    if(props.href !== undefined && props.href !== null) {
        return  <Link className={className} title={title} to={props.href}>
                    {icon}
                    <span className='txt'>{props.text}</span>
                    {count}
                </Link>;
    }
    else {
        return  <a className={className} title={title} onClick={props.onClick}>
                    {icon}
                    <span className='txt'>{props.text}</span>
                    {count}
                </a>
    }
}

function formatNumber(num) {
    if (num >= 1000) {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const tier = Math.floor(Math.log10(num) / 3); // Determine the suffix tier
        const scaled = Math.floor(num / Math.pow(10, tier * 3)); // Scale and floor the number
        return `${scaled}${suffixes[tier]}`;
    }
    return num.toString(); // Return the number as-is if less than 1000
}