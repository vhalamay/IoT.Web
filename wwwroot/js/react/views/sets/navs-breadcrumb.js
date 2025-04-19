import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import Navs from '../../shared/navs';
import { SetTitle_Set_Act } from './../../titles';

import { 
    Api_Set_Info 
} from '../../links';

export default function SetNavsBreadcrumb(props) {
    let [dataInfo, setDataInfo] = useState('');

    const getDataInfo = () => {
        axios
        .get(Api_Set_Info(props.setId))
        .then(function (response) {
            setDataInfo(response.data);
        })
    };

    useEffect(() => {
        getDataInfo();
    },[]);  

    SetTitle_Set_Act(dataInfo.name, props.current);

    let breadcrumbs = [new TextHrefItem('Sets', '/sets'), 
        new TextHrefItem(dataInfo.name, `/sets/${props.setId}`),
        new TextHrefItem(props.current)];

    let textHrefItem = new TextHrefItem(dataInfo.type !== 0 ? 'Tests' : 'Terms', 
        `/sets/${props.setId}/${dataInfo.type !== 0 ? `tests` : `terms`}`, 
        dataInfo.type !== 0 ? dataInfo.tests : dataInfo.terms);

    let navs = [new TextHrefItem('Edit', `/sets/${props.setId}/edit`), 
        new TextHrefItem('Learn', `/sets/${props.setId}/learn`),
        textHrefItem, 
        new TextHrefItem('Folders', `/sets/${props.setId}/folders`, dataInfo.folders)];

    return <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Navs navs={navs} />
    </div>;
}