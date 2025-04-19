import React from 'react';
import { useParams } from 'react-router-dom';

import TermSetsContent from '../terms/sets';

export default function FolderTermSetsContent() {
    let { pFolderId, pTermId } = useParams();

    return <TermSetsContent folderId={pFolderId} termId={pTermId}/>;
}