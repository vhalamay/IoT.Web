import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Test_Act } from './../../titles';

import {
    Api_Set_Tests_Info,
    Api_Folder_Tests_Info
} from './../../links';

export default function TestBreadcrumb(props) {
    let [dataInfo, setDataInfo] = useState('');

    const getDataInfo = () => {
        let href = props.setId !== undefined 
        ? Api_Set_Tests_Info(props.setId) 
        : Api_Folder_Tests_Info(props.folderId);

        axios
        .get(href)
        .then(function (response) {
            setDataInfo(response.data);
        })
    };

    useEffect(() => {
        getDataInfo();
    },[]);  

    SetTitle_Test_Act(props.current);

    let breadcrumbs = props.setId !== undefined 
        ? [new TextHrefItem('Sets', '/sets'), 
        new TextHrefItem(dataInfo.name, `/sets/${props.setId}`),
        new TextHrefItem('Tests', `/sets/${props.setId}/tests`),
        new TextHrefItem(props.current)]
        : [new TextHrefItem('Folders', '/folders'),
        new TextHrefItem(dataInfo.name, `/folders/${props.folderId}`),
        new TextHrefItem('Tests', `/folders/${props.folderId}/tests`),
        new TextHrefItem(props.current)];

    return <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
    </div>;
}