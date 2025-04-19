import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../../shared/paging';
import NoItems from '../../shared/no-items';
import Loader from '../../shared/loader';
import Lnk from '../buttons/lnk';
import SearchInput from '../search-input';

import {
    Api_Devices_Sessions,
    Api_Sessions
} from '../../links';

export default function SessionsTable(props) {
    const elementId = 'sessions-';
    const pageId = elementId + 'page';
    const filterNameId = elementId + 'filter-name';

    let [dataTable, setDataTable] = useState('');
    let [loaded, setLoaded] = useState(false);
    let [filterName, setFilterName] = useState(GetFromStorage(filterNameId, ''));
    
    const getItems = () => {
        setLoaded(false);

        let isFirstParam = false;
        let href = props.deviceId !== undefined
            ? Api_Devices_Sessions(props.deviceId)
            : Api_Sessions();
        
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

    const deleteSession = (id) => {
        setLoaded(false);

        axios
        .delete(Api_Session_Delete(id))
        .then(function (response) {
            if(response.status === 200) {
                getItems();
            }
        })
    }
    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((session, index) => 
        <div className='l-row' key={index}>
            <div className='l-clm info'>
                <Lnk href="#" text={session.device}/>
            </div>
            <div className='l-clm date'>
                <span>{session.start}</span>
            </div>
            <div className='l-clm duration'>
                <span>{session.duration}</span>
            </div>
            <div className='l-clm btns'>
                <Lnk text='Activities' isBtn={true} href={Api_Devices_Sessions(session.id)} count={session.activities}/>
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
            <div className='l-tbl-sessions'>
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