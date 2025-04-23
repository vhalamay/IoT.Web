import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../paging';
import NoItems from '../no-items';
import Loader from '../loader';
import SearchInput from '../search-input';
import Lnk from '../buttons/lnk';

import {
    Link_Device_Edit,
    Link_Device_Sessions,
    Api_Devices,
    Api_Devices_Start,
    Api_Devices_Finish
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

    const startDevice = (id) => {
        setLoaded(false);
        
        axios
        .post(Api_Devices_Start(id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const finishDevice = (id) => {
        setLoaded(false);
        
        axios
        .post(Api_Devices_Finish(id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
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
            <div className='l-clm btns'>
                <Lnk text='Sessions' isBtn={true} href={Link_Device_Sessions(device.id)} count={device.sessions}/>
            </div>
            <div className='l-clm actn'>
                <Lnk text='Start' icon={faPlay} isBtn={true} hide={device.active === true} onClick={()=>(startDevice(device.id))} className='l-green'/>
                <Lnk text='Finish' icon={faPause} isBtn={true} hide={device.active === false} onClick={()=>(finishDevice(device.id))} className='l-red' />
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