import React from 'react';

import TopBar from './top-bar';
import TermManage from './_manage';

export default function TermEditContent(props) {
    return  <div>
                <TopBar current='Edit' termId={props.termId} setId={props.setId} folderId={props.folderId} edit={true}/>
                <TermManage termId={props.termId} setId={props.setId} folderId={props.folderId}/>
            </div>;
}