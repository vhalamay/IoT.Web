import React from 'react';
import { useParams } from 'react-router-dom';

import TermCreateContent from '../terms/create';

export default function SetTermCreateContent() {
    let { id } = useParams();
    
    return <TermCreateContent setId={id} />
}