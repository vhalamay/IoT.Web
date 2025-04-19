import React from 'react';
import { useParams } from 'react-router-dom';

import TermSetsContent from '../terms/sets';

export default function SetTermEditContent() {
    let { pSetId, pTermId } = useParams();
    
    return <TermSetsContent setId={pSetId} termId={pTermId}/>
}