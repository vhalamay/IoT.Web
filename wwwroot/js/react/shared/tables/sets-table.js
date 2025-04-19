import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faClone, faTrashCan, faBook, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../paging'
import NoItems from '../no-items'
import { TermsClass, FoldersClass } from './../table-buttons'
import { Inactive, Favorite, ToDo } from './../table-badges'
import ProgressBadges from './../progress-badges';
import Loader from '../loader';
import SearchInput from '../search-input';
import Lnk from '../buttons/lnk';
import Alias from '../alias'; 

import {
    Link_Set_Edit,
    Link_Set_Clone,
    Link_Set_Folders,
    Link_Set_Terms,
    Link_Set_Tests,
    Link_Set_Learn,
    Api_Folder_Sets,
    Api_Term_Sets,
    Api_Sets,
    Api_Set_Delete,
    Api_FolderSet_Add,
    Api_FolderSet_Remove,
    Api_Term_Set_Add,
    Api_Term_Set_Remove
} from '../../links';

export default function SetsTable(props) {
    
    const elementId = props.folderId !== undefined 
    ? 'folder-sets-'
    : props.termId !== undefined 
        ? 'term-sets-'
        : 'sets-';

    const orderId = elementId + 'order';
    const pageId = elementId + 'page';
    const filterNameId = elementId + 'filter-name';
    const filterTypeId = elementId + 'filter-type';
    const filterStatusId = elementId + 'filter-status';
    const filterFoldersId = elementId + 'filter-folders';

    let [dataTable, setDataTable] = useState('');
    let [leaded, setLoaded] = useState(false);
    let [order, setOrder] = useState(GetFromStorage(orderId, ''));
    let [filterName, setFilterName] = useState(GetFromStorage(filterNameId, ''));
    let [filterType, setFilterType] = useState(GetFromStorage(filterTypeId, ''));
    let [filterStatus, setFilterStatus] = useState(GetFromStorage(filterStatusId, ''));
    let [filterFolders, setFilterFolders] = useState(GetFromStorage(filterFoldersId, ''));

    let isFirstRun = false;

    const getItems = () => {

        let href = props.folderId !== undefined 
            ? Api_Folder_Sets(props.folderId) 
            : props.termId !== undefined 
                ? Api_Term_Sets(props.termId) 
                : Api_Sets();

        let isFirstParam = false;

        // set name
        if(filterName !== ''){
            href += (isFirstParam ? '&' : '?') + 'name=' + filterName;
            isFirstParam = true;
        }

        // set type
        if(filterType !== ''){
            href += (isFirstParam ? '&' : '?') + 'type=' + filterType;
            isFirstParam = true;
        }

        // set status
        if(filterStatus !== ''){
            href += (isFirstParam ? '&' : '?') + 'active=' + filterStatus;
            isFirstParam = true;
        }

        // set folders
        if(filterFolders !== ''){
            href += (isFirstParam ? '&' : '?') + 'folders=' + filterFolders;
            isFirstParam = true;
        }

        // order
        if(order !== ''){
            href += (isFirstParam ? '&' : '?') + 'order=' + order;
            isFirstParam = true;
        }

        // page
        let page = GetFromStorage(pageId, '');
        if(page !== ''){
            href += (isFirstParam ? '&' : '?') + 'page=' + page;
            isFirstParam = true;
        }

        setLoaded(false);
        axios.get(href)
        .then(function (response) {
            setDataTable(response.data);
            setLoaded(true);
        })
    };

    const applyFilter = () => {
        SetToStorage(pageId, '');
    }

    const updateSetNameFilter = (value) => {
        applyFilter();
        setFilterName(value);
        SetToStorage(filterNameId, value);
    }

    const updateSetTypeFilter = (event) => {
        applyFilter();
        setFilterType(event.target.value);
        SetToStorage(filterTypeId, event.target.value);
    }

    const updateSetStatusFilter = (event) => {
        applyFilter();
        setFilterStatus(event.target.value);
        SetToStorage(filterStatusId, event.target.value);
    }

    const updateSetFoldersFilter = (event) => {
        applyFilter();
        setFilterFolders(event.target.value);
        SetToStorage(filterFoldersId, event.target.value);
    }

    const updateOrder = (event) => {
        applyFilter();
        setOrder(event.target.value);
        SetToStorage(orderId, event.target.value);
    }

    const deleteSet = (id) => {
        setLoaded(false);
        axios
        .delete(Api_Set_Delete(id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const addFolderSet = (id) => {
        setLoaded(false);
        axios
        .post(Api_FolderSet_Add(props.folderId, id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const removeFolderSet = (id) => {
        setLoaded(false);
        axios
        .delete(Api_FolderSet_Remove(props.folderId, id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const addTermSet = (id) => {
        setLoaded(false);
        axios
        .post(Api_Term_Set_Add(props.termId, id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const removeTermSet = (id) => {
        setLoaded(false);
        axios
        .delete(Api_Term_Set_Remove(props.termId, id))
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

    // filterType
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterType]);

    // filterStatus
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterStatus]);

    // filterFolders
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterFolders]);

    // order
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [order]);

    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((set, index) => 
        <div className='l-row' key={index}>
            <div className='l-clm info'>
                <Lnk href={Link_Set_Edit(set.id)} text={set.name}/>
                <Alias alias={set.alias}/>
                <Favorite favorite={set.favorite}/>
                <Inactive active={set.active}/>
                <ToDo toDo={set.toDo}/>
            </div>
            <div className='l-clm prg-btns'>
                <ProgressBadges scs={set.success} flr={set.failure} prg={set.progress}/>
                <div className='btns'>
                    <Lnk text='Terms' isBtn={true} hide={set.type !== 0} href={Link_Set_Terms(set.id)} className={TermsClass(set.count)} count={set.count}/>
                    <Lnk text='Tests' isBtn={true} hide={set.type !== 1} href={Link_Set_Tests(set.id)} className={TermsClass(set.count)} count={set.count}/>
                    <Lnk text='Foldres' isBtn={true} href={Link_Set_Folders(set.id)} className={FoldersClass(set.folders)} count={set.folders}/>
                </div>
            </div>
            <div className='l-clm actn'>
                <Lnk icon={faBook} text='Learn' isBtn={true} href={Link_Set_Learn(set.id)}/>
                <Lnk icon={faClone} text='Clone' isBtn={true} href={Link_Set_Clone(set.id)}/>
                <Lnk icon={faTrashCan} text='Delete' isBtn={true} hide={props.folderId !== undefined || props.termId !== undefined} onClick={()=>(deleteSet(set.id))} className='l-red'/>
                <Lnk icon={faPlus} text='Add' isBtn={true} hide={props.folderId === undefined || set.folderSetId !== undefined} onClick={()=>(addFolderSet(set.id))}/>
                <Lnk icon={faMinus} text='Remove' isBtn={true} hide={props.folderId === undefined || set.folderSetId === undefined} onClick={()=>(removeFolderSet(set.id))} className='l-red'/>
                <Lnk icon={faPlus} text='Add' isBtn={true} hide={props.termId === undefined || set.termSetId !== undefined} onClick={()=>(addTermSet(set.id))}/>
                <Lnk icon={faMinus} text='Remove' isBtn={true} hide={props.termId === undefined || set.termSetId === undefined} onClick={()=>(removeTermSet(set.id))} className='l-red'/>
            </div>
        </div>) 
        : <NoItems/>;

    let paging = <Paging data={dataTable} getItems={getItems} elementId={pageId} />;

    let filters =   <div className='l-fltr'>
                        <div>
                            <SearchInput onUpdate={updateSetNameFilter} value={filterName} />
                        </div>
                        <div>
                            <select onChange={(event)=>(updateSetTypeFilter(event))} defaultValue={filterType}>
                                <option value="">Type</option>
                                <option value="0">Terms</option>
                                <option value="1">Tests</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(event)=>(updateSetStatusFilter(event))} defaultValue={filterStatus}>
                                <option value="">Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(event)=>(updateSetFoldersFilter(event))} defaultValue={filterFolders}>
                                <option value="">Folders Count</option>
                                <option value="0">Many folders</option>
                                <option value="1">Single folder</option>
                            </select>
                        </div>
                        <div>
                        <select onChange={(event)=>(updateOrder(event))} defaultValue={order}>
                            <option value=''>Alphabetically</option>
                            <option value="count">Terms / Tests</option>
                            <option value="learned">Less Learned</option>
                        </select>
                        </div>
                    </div>  

    return leaded === false ? <Loader /> : 
            <div className='l-tbl-sets'>
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