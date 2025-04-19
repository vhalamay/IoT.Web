import React from 'react';

import DevicesTable from '../../shared/tables/devices-table';
import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import { SetTitle_Devices } from '../../titles';

export default class DevicesContent extends React.Component {
    render() {
        let breadcrumbs = [new TextHrefItem('Devices')];
        let buttons = [new TopButton('Run All', '/devices/create')];

        SetTitle_Devices();

        return <div>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <TopButtons buttons={buttons}/>
            <DevicesTable breadcrumbs={breadcrumbs}/>
        </div>;
    }
}