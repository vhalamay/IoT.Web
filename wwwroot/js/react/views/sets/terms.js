import React from 'react';
import { useParams } from 'react-router-dom';

import SetNavsBreadcrumb from './navs-breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TermsTable from '../../shared/tables/terms-table';
import TopButton from '../../models/top-button';

import {
    Link_Set_Term_Create
    } from '../../links';

export default function SetTermsContent() {
    let { id } = useParams();

    let buttons = [new TopButton('Create Term', Link_Set_Term_Create(id))];
    
    return <div>
        <SetNavsBreadcrumb setId={id} current='Terms'/>
        <TopButtons buttons={buttons}/>
        <TermsTable setId={id}/>
    </div>;
}