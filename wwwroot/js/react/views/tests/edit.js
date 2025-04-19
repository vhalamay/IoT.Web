import React from 'react';

import TestManage from './_manage';
import TestBreadcrumb from './breadcrumb';

export default class TestEditContent extends React.Component {
    render() {
        return  <div>
                    <TestBreadcrumb current='Edit' testId={this.props.testId} setId={this.props.setId} folderId={this.props.folderId}/>
                    <TestManage testId={this.props.testId} setId={this.props.setId} folderId={this.props.folderId}/>
                </div>;
    }
}