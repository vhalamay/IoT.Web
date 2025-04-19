import React from 'react';

import TopBar from './top-bar';
import TermManage from './_manage';

export default function TermCreateContent(props) {
    return  <div>
                <TopBar current='Create' setId={props.setId}/>
                <TermManage setId={props.setId}/>
            </div>;
}