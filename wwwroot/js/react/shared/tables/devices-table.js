import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faClone, faTrashCan, faBook, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../paging';
import NoItems from '../no-items';
import Loader from '../loader';
import SearchInput from '../search-input';
import Lnk from '../buttons/lnk';

import {
    Link_Device_Edit,
    Api_Devices,
 } from '../../links';

export default function DevicesTable(props) {
    const elementId = 'devices-';
    const pageId = elementId + 'page';
    const filterNameId = elementId + 'filter-name';

    let [dataTable, setDataTable] = useState('');
    let [loaded, setLoaded] = useState(false);
        let [filterName, setFilterName] = useState(GetFromStorage(filterNameId, ''));

    let isFirstRun = false;
    
    const getItems = () => { 
        let href = Api_Devices();

        let isFirstParam = false;

        // name
        if(filterName !== ''){
            href += (isFirstParam ? '&' : '?') + 'name=' + filterName;
            isFirstParam = true;
        }

        // page
        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
            isFirstParam = true;
        }

        setLoaded(false);
        
        axios
        .get(href)
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

    // dataTable
    useEffect(() => {
        getItems();
        isFirstRun = true;
    },[]);    
    
    // filterName
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterName]);

    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((device, index) => 
        <div className='l-row' key={index}>
            <div className='l-clm info'>
                <Lnk href={Link_Device_Edit(device.id)} text={device.name}/>
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
            <div className='l-tbl-devices'>
                {paging}
                <div className='l-fltr-tbl'>
                    {filters}
                    <div className='l-tbl'>
                        {items}
                    </div>
                </div>
                {paging}
            </div>;
};