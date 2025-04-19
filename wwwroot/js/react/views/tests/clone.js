import React from 'react';

import TestManage from './_manage';
import TestBreadcrumb from './breadcrumb';

export default function TestCloneContent(props) {
    return  <div>
                <TestBreadcrumb current='Clone' setId={props.setId}/>
                <TestManage testId={props.testId} setId={props.setId} clone={true}/>
            </div>;
}