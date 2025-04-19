import React from 'react';

import SessionsTable from '../../shared/tables/sessions-table';
import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import { SetTitle_Act } from './../../titles';

export default class SessionsContent extends React.Component {
    render() {

        var action = 'Sessions';
        let breadcrumbs = [new TextHrefItem(action)];
        SetTitle_Act(action);

        return <div>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <SessionsTable/>
                </div>;
    }
}