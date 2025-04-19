import React from 'react';
import { useParams } from 'react-router-dom';

import FolderCreateEditContent from './_manage';

export default function FolderEditContent() {
    let { id } = useParams();

    return <FolderCreateEditContent folderId={id}/>;
}