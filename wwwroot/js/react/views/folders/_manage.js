import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Folder from '../../models/folder'
import Breadcrumb from '../../shared/breadcrumb';
import FolderNavsBreadcrumb from './navs-breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import { 
    SetTitle_Folder_Create,
    SetTitle_Folder_Clone
 } from '../../titles';

import {
    Link_Folder_Edit,
    Api_Folder_Get,
    Api_Folder_Edit,
    Api_Folder_Create,
} from '../../links';

export default function FolderCreateEditContent(props) {
    let navigate = useNavigate();

    let [folder, setFolder] = useState(new Folder());
    let [folderId, setFolderId] = useState(props.folderId);
    let [clone, setClone] = useState(props.clone !== undefined ? props.clone : false);

    if(folderId === undefined) {
        SetTitle_Folder_Create();
    }

    const getFolder = () => {
        if(folderId !== undefined) {
            axios
            .get(Api_Folder_Get(folderId))
            .then(function (response) {
                setFolder(new Folder(response.data));
                if(clone === true) {
                    SetTitle_Folder_Clone(response.data.name);
                } 
            })
        }
    };

    useEffect(() => {
        getFolder();
    },[]);  

    const updateName = (event) => {
        const f = {...folder};
        f.name = event.target.value;
        setFolder(f);
    }

    const updateDescription = (event) => {
        const f = {...folder};
        f.description = event.target.value;
        setFolder(f);
    }

    const updateFavorite = (event) => {
        const f = {...folder};
        f.favorite = event.target.value === 'true';
        setFolder(f);
    }

    const updateToDo = (event) => {
        const f = {...folder};
        f.toDo = event.target.value === 'true';
        setFolder(f);
    }

    const createFolder = () => {
        axios
        .post(Api_Folder_Create(), folder)
        .then(function (response) {
            navigate(Link_Folder_Edit(response.data));
        });
    }

    const updateFolder = () => {
        axios
        .put(Api_Folder_Edit(folderId), folder)
        .then(function (response) {
            navigate(0);
         });
    }


    let isUpdate = folderId !== undefined && clone === false;
    let isClone = folderId !== undefined && clone === true;
    let isCreate = folderId === undefined;

    let breadcrumb = null;
    let buttons = [];

    if(isUpdate) {
        breadcrumb = <FolderNavsBreadcrumb folderId={folderId} current='Edit'/>;
        buttons.push(new TopButton('Update', null, updateFolder));
    } else if(isClone) {
        breadcrumb = <Breadcrumb breadcrumbs={[new TextHrefItem('Folders', '/folders'), new TextHrefItem('Clone')]} />;
        buttons.push(new TopButton('Clone', null, createFolder));
    } else if (isCreate) {
        breadcrumb = <Breadcrumb breadcrumbs={[new TextHrefItem('Folders', '/folders'), new TextHrefItem('Create')]} />;
        buttons.push(new TopButton('Create', null, createFolder));
    }

    return <div>
                {breadcrumb}
                <TopButtons buttons={buttons}/>
                <div>
                    <div className='inpts inpts-1'>
                        <div>
                            <label>Name</label>
                            <input onChange={(event)=>(updateName(event))} value={folder.name} name="Name" type="text" ></input>
                        </div>
                    </div>
                    <div className='inpts'>
                        <div>
                            <label>Favorite</label>
                            <select onChange={(event)=>(updateFavorite(event))} value={folder.favorite}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        <div>
                            <label>To Do</label>
                            <select onChange={(event)=>(updateToDo(event))} value={folder.toDo}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                    </div>
                    <div className='inpts inpts-1'>
                        <div>
                            <label>Description</label>
                            <textarea onChange={(event) => (updateDescription(event))} value={folder.description}></textarea>
                        </div>
                    </div>
                </div>
            </div>;
}