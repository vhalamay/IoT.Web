import React from 'react';
import { useParams } from 'react-router-dom';

import FolderNavsBreadcrumb from './navs-breadcrumb';
import LearnContent from '../sessions/_learn';

export default function FolderLearnContent() {
    let { id } = useParams();

    return <div>
        <FolderNavsBreadcrumb folderId={id} current='Learn'/>
        <LearnContent folderId={id}/>
    </div>;
}