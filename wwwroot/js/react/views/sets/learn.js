import React from 'react';
import { useParams } from 'react-router-dom';

import SetNavsBreadcrumb from './navs-breadcrumb';
import LearnContent from '../sessions/_learn';

export default function SetLearnContent() {
    let { id } = useParams();

    return <div>
        <SetNavsBreadcrumb setId={id} current='Learn'/>
        <LearnContent setId={id}/>
    </div>;
}