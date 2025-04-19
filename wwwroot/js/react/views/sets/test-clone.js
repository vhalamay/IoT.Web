import React from 'react';
import { useParams } from 'react-router-dom';

import TestCloneContent from '../tests/clone';

export default function SetTestCloneContent() {
    let { pSetId, pTestId } = useParams();
    
    return <TestCloneContent setId={pSetId} testId={pTestId}/>
}