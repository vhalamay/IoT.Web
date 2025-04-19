import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import Navs from '../../shared/navs';
import { SetTitle_Folder_Act } from './../../titles';

import {
    Api_Folder_Info
} from '../../links';

export default function FolderNavsBreadcrumb(props) {
    let [dataInfo, setDataInfo] = useState('');

    const getDataInfo = () => {
        axios
        .get(Api_Folder_Info(props.folderId))
        .then(function (response) {
            setDataInfo(response.data);
        })
    };

    useEffect(() => {
        getDataInfo();
    },[]);  

    SetTitle_Folder_Act(dataInfo.name, props.current);

    let breadcrumbs = [new TextHrefItem('Folders', '/folders'), 
        new TextHrefItem(dataInfo.name, `/folders/${props.folderId}/edit`),
        new TextHrefItem(props.current)];

    let navs = [new TextHrefItem('Edit', `/folders/${props.folderId}/edit`), 
        new TextHrefItem('Learn', `/folders/${props.folderId}/learn`),
        new TextHrefItem('Sets', `/folders/${props.folderId}/sets`, dataInfo.sets), 
        new TextHrefItem('Terms', `/folders/${props.folderId}/terms`, dataInfo.terms), 
        new TextHrefItem('Tests', `/folders/${props.folderId}/tests`, dataInfo.tests), 
        new TextHrefItem('Users', `/folders/${props.folderId}/users`, dataInfo.users)];

    return <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Navs navs={navs} />
    </div>;
}