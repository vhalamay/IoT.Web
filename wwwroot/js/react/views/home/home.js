import React from 'react';
import SessionsActivitiesChart from '../../shared/widgets/sessions-activities-chart';
import ActivityTypesChart from '../../shared/widgets/activity-types-chart';

export default function HomeContent(props) {
    return <div className='charts'>
        <ActivityTypesChart />
        <SessionsActivitiesChart />
    </div>;
}