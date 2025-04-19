import React from 'react';
import { useParams } from 'react-router-dom';

import TestEditContent from '../tests/edit';

export default function FolderTestEditContent() {
    let { pFolderId, pTestId } = useParams();

    return <TestEditContent folderId={pFolderId} testId={pTestId}/>;
}