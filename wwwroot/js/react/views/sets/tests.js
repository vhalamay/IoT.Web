import React from 'react';
import { useParams } from 'react-router-dom';

import SetNavsBreadcrumb from './navs-breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TestsTable from '../../shared/tables/tests-table';
import TopButton from '../../models/top-button';

import { Link_Set_Test_Create } from '../../links'; 

export default function SetTestsContent() {
    let { id } = useParams();
    
    let buttons = [new TopButton('Create Test', Link_Set_Test_Create(id))];

    return <div>
        <SetNavsBreadcrumb setId={id} current='Tests'/>
        <TopButtons buttons={buttons}/>
        <TestsTable setId={id}/>
    </div>;
}

