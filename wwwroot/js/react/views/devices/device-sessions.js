import React from 'react';

import SessionsTable from '../../shared/tables/sessions-table';
import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { useParams } from 'react-router-dom';
import { SetTitle_Act } from '../../titles';

export default function DeviceSessionsContent() {
        let { id } = useParams();
        var action = 'Sessions';
        let breadcrumbs = [new TextHrefItem('Devices', `/devices`),
            new TextHrefItem(action)];
        SetTitle_Act(action);

        return <div>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <SessionsTable deviceId={id}/>
                </div>;
    }