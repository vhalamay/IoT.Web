import React from 'react';

export default function ProgressBadges(props) {

    let scs = props.scs ?? 0;
    let flr = props.flr ?? 0;
    let prg = props.prg ?? 0;

    let scsText = scs + '%';
    let flrText = flr + '%';
    let prgText = prg + '%';

    var prgClass = 'l-green';
    if(prg < 25) {
        prgClass = 'l-red';
    } 
    else if(prg < 50){
        prgClass = 'l-yellow';
    } 
    else if(prg < 75){
        prgClass = 'l-blue';
    }
    prgClass = 'prg ' + prgClass;

    return <div className='l-prg-bdg'>
        <span className='scs'>{scsText}</span>
        <span className='flr'>{flrText}</span>
        <span className={prgClass}>{prgText}</span>
    </div>
}
export class Success extends React.Component {
    render() {
        let success = this.props.value !== undefined ? this.props.value : 0;

        return  <span title='Success' className="badge bg-success rounded-pill prg">
                    {`${success}%`}
                </span>;
    }
}
export class Failure extends React.Component {
    render() {
        let failure = this.props.value !== undefined ? this.props.value : 0;

        return  <span title='Failure' className="badge bg-danger rounded-pill ml-1 prg">
                    {`${failure}%`}
                </span>;
    }
}
export class Progress extends React.Component {
    render() {
        let progress = this.props.value !== undefined ? this.props.value : 0;

        var bgClass = 'success';
        if(progress < 25) {
            bgClass = 'danger';
        } 
        else if(progress < 50){
            bgClass = 'warning';
        } 
        else if(progress < 75){
            bgClass = 'primary';
        }

        return  <span title='Progress' className={`badge bg-${bgClass} ml-2 mr-1 prg`}>
                    {`${progress}%`}
                </span>;
    }
}