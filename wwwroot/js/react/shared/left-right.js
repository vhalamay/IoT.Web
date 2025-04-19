
import React from 'react';

export class Left extends React.Component {
    render() {
        let title = this.props.title ?? 'Left';
        return <div className='l-lft-rght'>
                    <div className='itm-lft' title={title}>
                        <Badge title={this.props.title}/>
                        <Content content={this.props.content}/>
                    </div>
                    <Notes notes={this.props.notes}/>
                </div>;
    }
}

export class Right extends React.Component {
    render() {
        let title = this.props.title ?? 'Right';
        let className = this.props.correct === false ? 'itm-rght red' : 'itm-rght';
        return <div className='l-lft-rght'>
                    <div className={className} title={title}>
                        <Badge title={this.props.title}/>
                        <Content content={this.props.content}/>
                    </div>
                    <Notes notes={this.props.notes}/>
                </div>;
    }
}

class Notes extends React.Component {
    render() {
        if(this.props.notes === undefined || this.props.notes === null ||this.props.notes.length === 0)
            return null;

        return <div className='itm-nts' title='Notes' dangerouslySetInnerHTML={{__html: this.props.notes}}/>;
    }
}

class Badge extends React.Component {
    render() {
        if (this.props.title === undefined || this.props.title === null || this.props.title === '')
            return null;

        return <span className='bdg'>{this.props.title}</span>;
    }
}

class Content extends React.Component {
    render() {
        return <div className='cnt' dangerouslySetInnerHTML={{__html: this.props.content}}/>;
    }
}
