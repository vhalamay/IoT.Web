import React, { useState, useEffect } from 'react';
import { GetFromStorage, SetToStorage } from '../extensions/local-storage';

export default function Paging(props) {
    let [currentPage, setCurrentPage] = useState(parseInt(GetFromStorage(props.elementId, 1)));
    let [count, setCount] = useState(props.data.count !== undefined ? props.data.count : 0);
    let [pagesCount, setPagesCount] = useState(Math.ceil(count / 10));
    let [pages, setPages] = useState([1]);
    let [leftEdge, setLeftEdge] = useState(false);
    let [rightEdge, setRightEdge] = useState(false);

    var itemsCount = props.data.items !== undefined ? props.data.items.length : 0;
    var text = count === itemsCount ? `${count} item(s)` : `${itemsCount} of ${count} item(s)`;

    useEffect(() => {

        let tempPages = [1];

        if(pagesCount > 1)
            tempPages.push(pagesCount);

        if(!tempPages.includes(currentPage))
            tempPages.push(currentPage);

        if(!tempPages.includes(currentPage - 1) && (currentPage - 1) > 1)
            tempPages.push(currentPage - 1);

        if(!tempPages.includes(currentPage + 1) && (currentPage + 1) < pagesCount )
            tempPages.push(currentPage + 1);

        if(tempPages.length > 1) {
            tempPages.sort(function (a, b) { return a - b; });

            setLeftEdge((tempPages[0] + 1) !== tempPages[1]);
            setRightEdge((tempPages[tempPages.length - 2] + 1) !== tempPages[tempPages.length - 1]);

        } else {
            setLeftEdge(false);
            setRightEdge(false);
        }

        setPages(tempPages);
    }, [currentPage]);

    useEffect(() => {
        if(currentPage > pagesCount) {
            setCurrentPage(1);
            SetToStorage(props.elementId, '');
        }

    }, [pagesCount]);

    const makeCall = (page) => {
        setCurrentPage(page);
        SetToStorage(props.elementId, page === 1 ? '' : page);

        props.getItems();
    }

    let buttons = pages.map((page) => <button 
        className={(page == currentPage ? 'current' : '') + (page === 1 && leftEdge ? 'left' : '') + (page === pagesCount && rightEdge ? 'right' : '')} 
        disabled={page === currentPage}
        key={page} 
        onClick={()=>(makeCall(page))}>{page}</button>);

    return  <div className='l-paging'>
                <div className='displaying'><span>{text}</span></div>
                {buttons.length > 1 && < div className='pages'>{buttons}</div>}
            </div>;
}