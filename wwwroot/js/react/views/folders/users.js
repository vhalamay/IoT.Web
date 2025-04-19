import React from 'react';
import { useParams } from 'react-router-dom';

import FolderNavsBreadcrumb from './navs-breadcrumb'
import UsersTable from '../../shared/tables/users-table';

export default function FolderUsersContent() {
    let { id } = useParams();

    return <div>
        <FolderNavsBreadcrumb folderId={id} current='Users'/>
        <UsersTable folderId={id} />
    </div>;
}