import React from 'react';
import { useParams } from 'react-router-dom';

import FoldersTable from '../../shared/tables/folders-table';
import SetNavsBreadcrumb from './navs-breadcrumb';

export default function SetFoldersContent() {
    let { id } = useParams();


    return <div>
        <SetNavsBreadcrumb setId={id} current='Folders'/>
        <FoldersTable setId={id}  />
    </div>;
}