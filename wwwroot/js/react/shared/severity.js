import React from 'react';

export default function Severity(props) {
    if(props.severity === 0)
        return <span title='Severity: Medium' className='l-svrt medium'>Medium</span>;

    if(props.severity === 1)
        return <span title='Severity: Easy' className='l-svrt easy'>Easy</span>;
    
    if(props.severity === 2)
        return <span title='Severity: Hard' className='l-svrt hard'>Hard</span>;

    return null;
}