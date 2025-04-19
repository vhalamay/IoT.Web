import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Set from '../../models/set'
import Breadcrumb from '../../shared/breadcrumb';
import SetNavsBreadcrumb from './navs-breadcrumb'
import Select from '../../shared/select';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import { 
    SetTitle_Set_Create,
    SetTitle_Set_Clone
 } from './../../titles';

import {
    Link_Set_Edit,
    Api_Set_Create,
    Api_Set_Edit,
    Api_Set_Clone,
    Api_Lookup_Folders,
} from './../../links';

export default function SetCreateEditContent(props) {
    let navigate = useNavigate();

    let [set, setSet] = useState(new Set());
    let [setId, setSetId] = useState(props.setId);
    let [clone, setClone] = useState(props.clone !== undefined ? props.clone : false);
    let [folders, setFolders] = useState([]);

    if(setId === undefined) {
        SetTitle_Set_Create();
    }

    const getSet = () => {
        if(props.setId !== undefined) {
            axios
            .get(Api_Set_Edit(props.setId))
            .then(function (response) {
                setSet(new Set(response.data));
                if(clone === true) {
                    SetTitle_Set_Clone(response.data.name);
                } 
            })
        }
    };
    
    const getFolders = () => {
        axios
        .get(Api_Lookup_Folders())
        .then(function (response) {
            setFolders(response.data);
        })
    };

    const setFolderId = () => {
        if(props.folderId !== undefined){
            updateFolder(props.folderId);
        }
    };

    useEffect(() => {
        getSet();
        getFolders();
        setFolderId();
    },[]);  

    const updateFolder = (folderId) => {
        const s = {...set};
        s.folderId = folderId;
        setSet(s);
    }

    const updateName = (event) => {
        const s = {...set};
        s.name = event.target.value;
        setSet(s);
    }

    const updateDescription = (event) => {
        const s = {...set};
        s.description = event.target.value;
        setSet(s);
    }

    const updateType = (event) => {
        const s = {...set};
        s.type =  parseInt(event.target.value);
        setSet(s);
    }

    const updateActive = (event) => {
        const s = {...set};
        s.active = event.target.value === 'true';
        setSet(s);
    }

    const updateFavorite = (event) => {
        const s = {...set};
        s.favorite = event.target.value === 'true';
        setSet(s);
    }

    const updateToDo = (event) => {
        const s = {...set};
        s.toDo = event.target.value === 'true';
        setSet(s);
    }

    const updateLeft = (event) => {
        const s = {...set};
        s.left = event.target.value;
        setSet(s);
    }
    const updateRight = (event) => {
        const s = {...set};
        s.right = event.target.value;
        setSet(s);
    }
    const updateAlias = (event) => {
        const s = {...set};
        s.alias = event.target.value;
        setSet(s);
    }

    const createSet = () => {
        axios
        .post(Api_Set_Create(), set)
        .then(function (response) {
            navigate(Link_Set_Edit(response.data));
        });
    }

    const cloneSet = () => {
        axios
        .post(Api_Set_Clone(setId), set)
        .then(function (response) {
            navigate(Link_Set_Edit(response.data));
        });
    }

    const updateSet = () => {
        axios
        .put(Api_Set_Edit(setId), set)
        .then(function (response) {
            navigate(0);
        });
    }

    let isUpdate = setId !== undefined && clone === false;
    let isClone = setId !== undefined && clone === true;
    let isCreate = setId === undefined;

    let breadcrumb = null;
    let buttons = [];

    if(isUpdate) {
        breadcrumb = <SetNavsBreadcrumb setId={setId} current='Edit'/>;
        buttons.push(new TopButton('Update', null, updateSet));
    } else if(isClone) {
        breadcrumb = <Breadcrumb breadcrumbs={[new TextHrefItem('Sets', '/sets'), new TextHrefItem('Clone')]} />;
        buttons.push(new TopButton('Clone', null, cloneSet));
    } else if (isCreate) {
        breadcrumb = <Breadcrumb breadcrumbs={[new TextHrefItem('Sets', '/sets'), new TextHrefItem('Create')]} />;
        buttons.push(new TopButton('Create', null, createSet));
    }

    let folderComponent = !isCreate ? null :
        <div className='inpts inpts-1'>
            <div>
                <label>Folder</label>
                <Select defaultOption={'Select Folder'} items={folders.items} onChange={updateFolder} value={props.folderId}/>
            </div>
        </div>;

    let typeComponent =
        <div>
            <label>Type</label>
            <select onChange={(event)=>(updateType(event))} value={set.type}>
                <option value={0}>Terms</option>
                <option value={1}>Tests</option>
            </select>
        </div>;

    let activeComponent =
        <div>
            <label>Active</label>
            <select onChange={(event)=>(updateActive(event))} value={set.active}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
        </div>;

    let favoriteComponent = 
        <div>
            <label>Favorite</label>
            <select onChange={(event)=>(updateFavorite(event))} value={set.favorite}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
        </div>;

    let toDoComponent = 
        <div>
            <label>To Do</label>
            <select onChange={(event)=>(updateToDo(event))} value={set.toDo}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
        </div>;

    let nameComponent = 
        <div>
            <label>Set</label>
            <input onChange={(event) => (updateName(event))} value={set.name} type="text"></input>
        </div>

    let aliasComponent = 
        <div>
            <label>Alias</label>
            <input onChange={(event)=>(updateAlias(event))} value={set.alias} type="text"></input>
        </div>;

    return <div>
                {breadcrumb}
                <TopButtons buttons={buttons}/>
                <div>
                    {folderComponent}
                    <div className='inpts inpts-2'>
                        {nameComponent}
                        {aliasComponent}
                    </div>
                    <div className='inpts'>
                        {typeComponent}
                        {activeComponent}
                        {favoriteComponent}
                        {toDoComponent}
                    </div>
                    <div className='inpts inpts-1'>
                        <div>
                            <label>Description</label>
                            <textarea onChange={(event)=>(updateDescription(event))} value={set.description}></textarea>
                        </div>
                    </div>
                    <div className='inpts inpts-2'>
                        <div>
                            <label>Left</label>
                            <input onChange={(event)=>(updateLeft(event))} value={set.left} type="text"></input>
                        </div>
                        <div>
                            <label>Right</label>
                            <input onChange={(event)=>(updateRight(event))} value={set.right} type="text"></input>
                        </div>
                    </div>
                </div>
            </div>;
}