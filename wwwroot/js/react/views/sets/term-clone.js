import React from 'react';
import { useParams } from 'react-router-dom';

import TermCloneContent from '../terms/clone';

export default function SetTermCloneContent() {
    let { pSetId, pTermId } = useParams();
    
    return <TermCloneContent setId={pSetId} termId={pTermId}/>
}