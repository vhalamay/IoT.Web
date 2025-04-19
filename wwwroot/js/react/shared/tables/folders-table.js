import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faClone, faTrashCan, faBook, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { GetFromStorage, SetToStorage } from '../../extensions/local-storage';
import Paging from '../paging';
import NoItems from '../no-items';
import { TermsClass, SetsClass, UsersClass } from './../table-buttons';
import { Owner, Favorite, ToDo } from './../table-badges';
import Loader from '../loader';
import SearchInput from '../search-input';
import Lnk from '../buttons/lnk';

import {
    Link_Folder_Edit,
    Link_Folder_Clone,
    Link_Folder_Learn,
    Link_Folder_Sets,
    Link_Folder_Terms,
    Link_Folder_Tests,
    Link_Folder_Users,
    Api_Folders,
    Api_Set_Folders,
    Api_Folder_Delete,
    Api_FolderSet_Add,
    Api_FolderSet_Remove
 } from '../../links';

export default function FoldersTable(props) {
    const elementId = (props.setId !== undefined ? `set-${props.setId}-`: '') + 'folders-';
    const filterNameId = elementId + 'filter-name';
    const filterTypeId = elementId + 'filter-type';
    const filterUsersId = elementId + 'filter-users';
    const filterFavoriteId = elementId + 'filter-favorite';
    const filterToDoId = elementId + 'filter-to-do';
    const pageId = elementId + 'page';

    let [dataTable, setDataTable] = useState('');
    let [loaded, setLoaded] = useState(false);
    let [filterName, setFilterName] = useState(GetFromStorage(filterNameId, ''));
    let [filterType, setFilterType] = useState(GetFromStorage(filterTypeId, ''));
    let [filterUsers, setFilterUsers] = useState(GetFromStorage(filterUsersId, ''));
    let [filterFavorite, setFilterFavorite] = useState(GetFromStorage(filterFavoriteId, ''));
    let [filterToDo, setFilterToDo] = useState(GetFromStorage(filterToDoId, ''));

    let isFirstRun = false;
    
    const getItems = () => { 
        let href = props.setId !== undefined
            ? Api_Set_Folders(props.setId)
            : Api_Folders();

        let isFirstParam = false;

        // set name
        if(filterName !== ''){
            href += (isFirstParam ? '&' : '?') + 'name=' + filterName;
            isFirstParam = true;
        }

        // set type
        if(filterType !== ''){
            href += (isFirstParam ? '&' : '?') + 'owner=' + filterType;
            isFirstParam = true;
        }

        // set users
        if(filterUsers !== ''){
            href += (isFirstParam ? '&' : '?') + 'users=' + filterUsers;
            isFirstParam = true;
        }

        // set favorite
        if(filterFavorite !== ''){
            href += (isFirstParam ? '&' : '?') + 'favorite=' + filterFavorite;
            isFirstParam = true;
        }

        // set to-do
        if(filterToDo !== ''){
            href += (isFirstParam ? '&' : '?') + 'toDo=' + filterToDo;
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

    const updateSetUsersFilter = (event) => {
        applyFilter();
        setFilterUsers(event.target.value);
        SetToStorage(filterUsersId, event.target.value);
    }

    const updateSetFavoriteFilter = (event) => {
        applyFilter();
        setFilterFavorite(event.target.value);
        SetToStorage(filterFavoriteId, event.target.value);
    }

    const updateSetToDoFilter = (event) => {
        applyFilter();
        setFilterToDo(event.target.value);
        SetToStorage(filterToDoId, event.target.value);
    }

    const deleteFolder = (id) => {
        setLoaded(false);

        axios
        .delete(Api_Folder_Delete(id))
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
        .post(Api_FolderSet_Add(id, props.setId))
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
        .delete(Api_FolderSet_Remove(id, props.setId))
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

    // filterUsers
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterUsers]);

    // filterFavorite
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterFavorite]);

    // filterToDo
    useEffect(() => {
        if(isFirstRun === false){
            getItems();
        }
    }, [filterToDo]);

    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((folder, index) => 
        <div className='l-row' key={index}>
            <div className='l-clm info'>
                <Lnk href={Link_Folder_Edit(folder.id)} text={folder.name}/>
                <Owner owner={folder.owner}/>
                <Favorite favorite={folder.favorite}/>
                <ToDo toDo={folder.toDo}/>
            </div>
            <div className='l-clm btns'>
                <Lnk text='Terms' isBtn={true} href={Link_Folder_Terms(folder.id)} count={folder.terms} className={TermsClass(folder.terms)}/>
                <Lnk text='Tests' isBtn={true} href={Link_Folder_Tests(folder.id)} count={folder.tests} className={TermsClass(folder.tests)}/>
                <Lnk text='Sets' isBtn={true} href={Link_Folder_Sets(folder.id)} count={folder.sets} className={SetsClass(folder.sets)}/>
                <Lnk text='Users' isBtn={true} href={Link_Folder_Users(folder.id)} count={folder.users} className={UsersClass(folder.users)}/>
            </div>
            <div className='l-clm actn'>
                <Lnk text='Learn' icon={faBook} isBtn={true} href={Link_Folder_Learn(folder.id)}/>
                <Lnk text='Clone' icon={faClone} isBtn={true} href={Link_Folder_Clone(folder.id)}/>
                <Lnk text='Delete' icon={faTrashCan} isBtn={true} hide={props.setId !== undefined} onClick={()=>(deleteFolder(folder.id))} className='l-red'/>
                <Lnk text='Add' icon={faPlus} isBtn={true} hide={props.setId === undefined || folder.setFolderId !== undefined} onClick={()=>(addFolderSet(folder.id))}/>
                <Lnk text='Remove' icon={faMinus} isBtn={true} hide={props.setId === undefined || folder.setFolderId === undefined} onClick={()=>(removeFolderSet(folder.id))} className='l-red'/>
            </div>
        </div>) 
        : <NoItems/>;

    let paging = <Paging data={dataTable} getItems={getItems} elementId={pageId} />;

    let filters = <div className='l-fltr'>
                    <div>
                        <SearchInput onUpdate={updateSetNameFilter} value={filterName} />
                    </div>
                    <div>
                        <select onChange={(event)=>(updateSetTypeFilter(event))} defaultValue={filterType}>
                            <option value="">Type</option>
                            <option value="true">Owner</option>
                            <option value="false">Shared</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={(event)=>(updateSetUsersFilter(event))} defaultValue={filterUsers}>
                            <option value="">Users</option>
                            <option value="0">Many</option>
                            <option value="1">Single</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={(event)=>(updateSetFavoriteFilter(event))} defaultValue={filterFavorite}>
                            <option value="">Favorite</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={(event)=>(updateSetToDoFilter(event))} defaultValue={filterToDo}>
                            <option value="">To Do</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>;

    return loaded === false ? <Loader /> : 
            <div className='l-tbl-folders'>
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