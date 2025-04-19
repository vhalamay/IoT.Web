import React from 'react';
import { useParams } from 'react-router-dom';

import TestEditContent from '../tests/edit';

export default function SetTestEditContent() {
    let { pSetId, pTestId } = useParams();
    
    return <TestEditContent setId={pSetId} testId={pTestId}/>
}