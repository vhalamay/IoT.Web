import React from 'react';
import { useParams } from 'react-router-dom';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Act } from './../../titles';
import SessionActivitiesChart from "../../shared/widgets/session-activities-chart";
import ActivityTypesChart from '../../shared/widgets/activity-types-chart';

export default function SessionDashboardContent() {
    let { id } = useParams();

    var action = 'Session Dashboard';
    let breadcrumbs = [new TextHrefItem(action)];
    SetTitle_Act(action);

    return <div>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <div className='charts'>
                    <ActivityTypesChart sessionId={id}/>
                    <SessionActivitiesChart sessionId={id} />
                </div>
            </div>;
}