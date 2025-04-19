import React from 'react';

import TestManage from './_manage';
import TestBreadcrumb from './breadcrumb';

export default function TestCreateContent(props) {
    return  <div>
                <TestBreadcrumb current='Create' setId={props.setId}/>
                <TestManage setId={props.setId}/>
            </div>;
}