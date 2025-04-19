import React from 'react';

export default class ProgressOrder extends React.Component {
    render() {
        let crt = this.props.crt ?? 0;
        let qty = this.props.qty ?? 0;

        let scs = this.props.scs ?? 0;
        let flr = this.props.flr ?? crt - scs;

        let crtValue = (100 * crt / qty).toFixed(0);
        let qtyValue = 100 - crtValue;
        let scsValue = 0;
        let flrValue = 0;
        if(scs + flr !== 0)
        {
            scsValue = (100 * scs / (scs + flr)).toFixed(0);
            flrValue = 100 - scsValue;
        }

        let progressText = `${scsValue}% (+${scs} | -${flr})`;
        var orderText = `${crtValue}% (${crt} / ${qty})`;

        let scsText = scs > flr && scs > 0 ? progressText : null;
        let flrText = flr >= scs && flr > 0 ? progressText : null;
        let crtText = qtyValue < 50 ? orderText : null;
        let qtyText = qtyValue >= 50 ? orderText : null;

        let scsValueStyle = scsValue + '%';
        let flrValueStyle = flrValue + '%';
        let crtValueStyle = crtValue + '%';
        let qtyValueStyle = qtyValue + '%';

        return  <div className='l-prg-ord'>
                    <div className='l-prg'>
                        <div style={{"width": scsValueStyle}} className='l-scs'>
                            <span>{scsText}</span>
                        </div>
                        <div style={{"width": flrValueStyle}} className='l-flr'>
                            <span>{flrText}</span>
                        </div>
                    </div>
                    <div className='l-ord'>
                        <div style={{"width": crtValueStyle}} className='l-crt'>
                            <span>{crtText}</span>
                        </div>
                        <div style={{"width": qtyValueStyle}} className='l-qty'>
                            <span>{qtyText}</span>
                        </div>
                    </div>
                </div>;
    }
}