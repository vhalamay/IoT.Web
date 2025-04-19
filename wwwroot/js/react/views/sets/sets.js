import React from 'react';

import SetsTable from '../../shared/tables/sets-table';
import TextHrefItem from '../../models/text-href-item'
import Breadcrumb from '../../shared/breadcrumb';
import TopButtons from '../../shared/top-buttons';
import TopButton from '../../models/top-button';
import { SetTitle_Sets } from './../../titles';
import { Link_Set_Create } from '../../links';

export default class SetsContent extends React.Component {
    render() {
        let breadcrumbs = [new TextHrefItem('Sets')];
        let buttons = [new TopButton('Create Set', Link_Set_Create())];
        
        SetTitle_Sets();

        return  <div>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <TopButtons buttons={buttons}/>
                    <SetsTable />
                </div>;
    }
}
