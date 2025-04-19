import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import NoItems from '../no-items';
import { Owner } from './../table-badges';
import Loader from '../loader';
import Paging from '../paging';
import Lnk from '../buttons/lnk';
import SearchInput from '../search-input';

import {
    Api_Folder_Users,
    Api_Folder_Users_Add,
    Api_Folder_Users_Remove
} from '../../links';

export default function UsersTable(props) {

    let [dataTable, setDataTable] = useState('');
    let [leaded, setLoaded] = useState(false);

    const elementId = (props.folderId !== undefined ? `folder-${props.folderId}-`: ``) + `users-`;
    const orderId = elementId + 'order';
    const pageId = elementId + 'page';

    const getItems = () => { 
        setLoaded(false);
        axios
        .get(Api_Folder_Users(props.folderId))
        .then(function (response) {
            setDataTable(response.data);
            setLoaded(true);
        })
        .catch(function (error) {
            if(error.response.status === 403){
                window.location.href = "/folders";
            }
            setLoaded(true);
        });
    };

    // dataTable
    useEffect(() => {
        getItems();
    },[]);   

    const addUser = (id) => {
        setLoaded(false);
        axios
        .post(Api_Folder_Users_Add(props.folderId, id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    const removeUser = (id) => {
        setLoaded(false);
        axios
        .delete(Api_Folder_Users_Remove(props.folderId, id))
        .then(function (response) {
            getItems();
        })
        .catch(function (error) {
            setLoaded(true);
        });
    }

    let filters =   <div className='l-fltr'>
                        <div>
                            <SearchInput/>
                        </div>
                    </div>

    const items = dataTable ? dataTable.items.length === 0 ? <NoItems/> : dataTable.items.map((folderUser, index) => 
    <div className='l-row' key={index}>
        <div className='l-clm info'>
            <a>{folderUser.email}</a>
            <Owner owner={folderUser.owner}/>
        </div>
        <div className='l-clm actn'>
            <Lnk icon={faPlus} text='Add' isBtn={true} hide={folderUser.folderUserId !== undefined} onClick={()=>(addUser(folderUser.userId))}/>
            <Lnk icon={faMinus} text='Remove' isBtn={true} hide={folderUser.folderUserId === undefined} onClick={()=>(removeUser(folderUser.userId))} className='l-red'/>
        </div>
    </div>) 
    : <NoItems/>;

    let paging = <Paging data={dataTable} getItems={getItems} elementId={pageId} />;

    return leaded === false ? <Loader /> : 
            <div className='l-tbl-users'>
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