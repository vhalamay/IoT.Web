import React from 'react';
import { useParams } from 'react-router-dom';

import FolderNavsBreadcrumb from './navs-breadcrumb';
import TermsTable from '../../shared/tables/terms-table';

export default function FolderTermsContent() {
    let { id } = useParams();

    return  <div>
                <FolderNavsBreadcrumb folderId={id} current='Terms'/>
                <TermsTable folderId={id}/>
            </div>;
}