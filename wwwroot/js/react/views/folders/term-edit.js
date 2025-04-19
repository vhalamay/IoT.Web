import React from 'react';
import { useParams } from 'react-router-dom';

import TermEditContent from '../terms/edit';

export default function FolderTermEditContent() {
    let { pFolderId, pTermId } = useParams();

    return <TermEditContent folderId={pFolderId} termId={pTermId}/>;
}