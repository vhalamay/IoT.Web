import React from 'react';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Act } from './../../titles';
import SessionActivityChart from "./../../shared/widgets/session-activity-chart";
import { useParams } from 'react-router-dom';

export default function DeviceDashboardContent() {
    let { id } = useParams();

    var action = 'Device Dashboard';
    let breadcrumbs = [new TextHrefItem(action)];
    SetTitle_Act(action);

    return <div>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <SessionActivityChart deviceId={id} />
            </div>;
}