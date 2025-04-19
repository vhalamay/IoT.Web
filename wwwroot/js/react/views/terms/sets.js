import React from 'react';

import TopBar from './top-bar';
import SetsTable from './../../shared/tables/sets-table';

export default function TermSetsContent(props) {
    
    return  <div>
                <TopBar current='Sets' termId={props.termId} setId={props.setId} folderId={props.folderId} edit={true} />
                <SetsTable termId={props.termId}/>
            </div>;
}