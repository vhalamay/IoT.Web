import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navs(props) {
    const location = useLocation();

    let getClasses = (href) => {
        let classes = 'itm';
        if(href === location.pathname)
            classes += ' crnt';

        return classes;
    }

    let items = props.navs.map((nav, index) => 
        <div className={getClasses(nav.href)} key={index}>
            <Link to={nav.href}>
                {nav.text}
                {nav.count !== null && <span className="cnt">{nav.count}</span>}
            </Link>
        </div>);

    return  <div className='l-nav'>
                {items}
            </div>;
}