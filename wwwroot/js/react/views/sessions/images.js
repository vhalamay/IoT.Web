import React from 'react';
import { useParams } from 'react-router-dom';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Act } from './../../titles';
import ImagesTable from './../../shared/tables/images-table'

export default function ImagesContent() {
    let { id } = useParams();

    var action = 'Session Images';
    let breadcrumbs = [new TextHrefItem(action)];
    SetTitle_Act(action);

    return <div>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <ImagesTable sessionId={id}/>
            </div>;
}