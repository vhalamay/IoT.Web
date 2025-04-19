import React from 'react';
import { useParams } from 'react-router-dom';

import SetCreateEditContent from './_manage';

export default function SetEditContent() {
    let { id } = useParams();
    
    return <SetCreateEditContent setId={id}/>;
}