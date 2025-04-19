import React from 'react';
import { useParams } from 'react-router-dom';

import TermEditContent from '../terms/edit';

export default function SetTermEditContent() {
    let { pSetId, pTermId } = useParams();
    
    return <TermEditContent setId={pSetId} termId={pTermId}/>
}