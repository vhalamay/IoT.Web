import React from 'react';

import TopBar from './top-bar';
import TermManage from './_manage';

export default function TermCloneContent(props) {
    return  <div>
                <TopBar current='Clone' termId={props.termId} setId={props.setId}/>
                <TermManage termId={props.termId} setId={props.setId} clone={true}/>
            </div>;
}