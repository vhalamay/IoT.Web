import React from 'react';
import SessionActivityChart from '../../shared/widgets/session-activity-chart';
import ActivitiesRadarChart from '../../shared/widgets/activities-radar-chart';

export default function HomeContent(props) {
    return <div>
        <SessionActivityChart />
        <ActivitiesRadarChart />
    </div>;
}