import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../paging';
import NoItems from '../no-items';
import Loader from '../loader';
import SearchInput from '../search-input';

import {
    Api_Session_Images
} from '../../links';

export default function ImagesTable(props) {
    const elementId = 'images-';
    const pageId = elementId + 'page';
    const filterNameId = elementId + 'filter-name';

    let [dataTable, setDataTable] = useState('');
    let [loaded, setLoaded] = useState(false);
    let [filterName, setFilterName] = useState(GetFromStorage(filterNameId, ''));
    
    const getItems = () => {
        setLoaded(false);

        let isFirstParam = false;
        let href = Api_Session_Images(props.sessionId);
        
        // name
        if(filterName !== ''){
            href += (isFirstParam ? '&' : '?') + 'name=' + filterName;
            isFirstParam = true;
        }

        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
            isFirstParam = true;
        }

        axios.get(href)
        .then(function (response) {
            setDataTable(response.data);
            setLoaded(true);
        })
    };

    const applyFilter = () => {
        SetToStorage(pageId, '');
    }

    const updateNameFilter = (value) => {
        applyFilter();
        setFilterName(value);
        SetToStorage(filterNameId, value);
    }

    useEffect(() => {
        getItems();
    },[]);

    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((image, index) => 
        <div className='l-row' key={index}>
            <a href={`/images/${image.imageGuid}.jpg`} target="_blank" rel="noopener noreferrer">
                <img src={`/images/${image.imageGuid}.jpg`} alt={image.activityType} />
            </a>
            <div>
                <div className='img-info'>
                    <b>Activity Type:</b>
                    <span>{image.activityType}</span>
                </div>
                <div className='img-info'>
                    <b>Created on:</b>
                    <span>{image.createdOn}</span>
                </div>
                <div className='img-info'>
                    <b>Objects:</b>
                    <span>{image.objects}</span>
                </div>
            </div>
        </div>)
        : <NoItems/>;

    let paging = <Paging data={dataTable} getItems={getItems} elementId={pageId} />;
            
    let filters = <div className='l-fltr'>
                    <div>
                        <SearchInput onUpdate={updateNameFilter} value={filterName} />
                    </div>                    
                </div>;

    return loaded === false ? <Loader /> : 
            <div className='l-tbl-images'>
                {paging}
                <div className='l-fltr-tbl'>
                    {filters}
                    <div className='l-tbl'>
                        {items}
                    </div>
                </div>
                {paging}
            </div>;
}