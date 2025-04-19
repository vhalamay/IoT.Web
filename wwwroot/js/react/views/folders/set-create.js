import React from 'react';
import { useParams } from 'react-router-dom';

import SetCreateContent from '../sets/create';

export default function FolderSetCreateContent() {
    let { id } = useParams();
    
    return <SetCreateContent folderId={id}/>;
}