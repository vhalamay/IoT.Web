import React from 'react';

import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Act } from './../../titles';
import InvertedLineChart from "./../../shared/widgets/line-chart";
import { useParams } from 'react-router-dom';

export default function SessionDashboardContent() {
    let { id } = useParams();

    var action = 'Session Dashboard';
    let breadcrumbs = [new TextHrefItem(action)];
    SetTitle_Act(action);

    return <div>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <InvertedLineChart sessionId={id} />
            </div>;
}