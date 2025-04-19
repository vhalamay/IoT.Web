import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Link_Folder_Set_Create
    } from '../../links';

import SetsTable from '../../shared/tables/sets-table';
import TopButtons from '../../shared/top-buttons';
import FolderNavsBreadcrumb from './navs-breadcrumb';
import TopButton from '../../models/top-button';

export default function FolderSetsContent() {
    let { id } = useParams();

    let buttons =  [new TopButton('Create Set', Link_Folder_Set_Create(id))];

    return <div>
        <FolderNavsBreadcrumb folderId={id} current='Sets'/>
        <TopButtons buttons={buttons}/>
        <SetsTable folderId={id}/>
    </div>;
}