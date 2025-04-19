import React from 'react';
import { useParams } from 'react-router-dom';

import SetCreateEditContent from './_manage';

export default function SetCloneContent() {
    let { id } = useParams();
    
    return <SetCreateEditContent setId={id} clone={true}/>;
}