import React from 'react';

import FoldersTable from '../../shared/tables/folders-table';
import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import { SetTitle_Folders } from './../../titles';

export default class FoldersContent extends React.Component {
    render() {
        let breadcrumbs = [new TextHrefItem('Folders')];
        let buttons = [new TopButton('Create Folder', '/folders/create')];

        SetTitle_Folders();

        return <div>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <TopButtons buttons={buttons}/>
            <FoldersTable breadcrumbs={breadcrumbs}/>
        </div>;
    }
}