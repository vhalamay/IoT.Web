import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import Navs from '../../shared/navs';
import { SetTitle_Term_Act } from '../../titles';

import { 
    Link_Folders,
    Link_Folder_Edit,
    Link_Folder_Terms,
    Link_Folder_Term_Edit,
    Link_Folder_Term_Sets,
    Link_Sets,
    Link_Set_Edit,
    Link_Set_Terms,
    Link_Set_Term_Edit,
    Link_Set_Term_Sets,
    Api_Folder_Terms_Info,
    Api_Set_Terms_Info
} from '../../links';

export default function TopBar(props) {
    let [dataInfo, setDataInfo] = useState('');

    const getDataInfo = () => {
        let href = props.setId !== undefined 
            ? Api_Set_Terms_Info(props.setId) 
            : Api_Folder_Terms_Info(props.folderId);

        axios
        .get(href)
        .then(function (response) {
            setDataInfo(response.data);
        })
    };

    useEffect(() => {
        getDataInfo();
    },[]);  

    SetTitle_Term_Act(props.current);

    // Breadcrumb
    let setBreadcrumbs = [new TextHrefItem('Sets', Link_Sets()), 
        new TextHrefItem(dataInfo.name, Link_Set_Edit(props.setId)),
        new TextHrefItem('Terms', Link_Set_Terms(props.setId)),
        new TextHrefItem(props.current)];

    let folderBreadcrumbs = [new TextHrefItem('Folders', Link_Folders()),
        new TextHrefItem(dataInfo.name, Link_Folder_Edit(props.folderId)),
        new TextHrefItem('Terms', Link_Folder_Terms(props.folderId)),
        new TextHrefItem(props.current)];

    let breadcrumbs = props.setId !== undefined 
        ? setBreadcrumbs
        : folderBreadcrumbs;

    // Navs
    let navEdit = props.setId !== undefined 
        ? Link_Set_Term_Edit(props.setId, props.termId)
        : Link_Folder_Term_Edit(props.folderId, props.termId);

    let navSets = props.setId !== undefined 
        ? Link_Set_Term_Sets(props.setId, props.termId)
        : Link_Folder_Term_Sets(props.folderId, props.termId);

    let navs = [new TextHrefItem('Edit', navEdit), 
        new TextHrefItem('Sets', navSets)];

    return  <div>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                {props.edit === true && <Navs navs={navs} />}
            </div>;
}