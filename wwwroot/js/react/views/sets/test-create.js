import React from 'react';
import { useParams } from 'react-router-dom';

import TestCreateContent from '../tests/create';

export default function SetTestCreateContent() {
    let { id } = useParams();
    
    return <TestCreateContent setId={id} />
}