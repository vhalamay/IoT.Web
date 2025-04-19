import React, { useState, useImperativeHandle } from 'react';

const ModalInfo = React.forwardRef(function ModalInfo(props, ref) {
    let [active, setActive] = useState(false);

    const open = () => {
        setActive(true);
    };

    const close = () => {
        setActive(false);
    };

    useImperativeHandle(ref, () => ({
        open: open,
        close: close
      }));

    let confirmTopText =  'Information';
    let closeButtonText = 'Close';

    return active === false ? null : 
        <div className="l-mdl">
            <div className="mdl">
                <div className='top'>
                    {confirmTopText}
                    <a title={closeButtonText} onClick={close}>✕</a>
                </div>
                <div className='cnt'>
                    {props.content}
                </div>
                <div className='btm'>
                    <button className='l-btn' onClick={close}>Ok</button>
                </div>
            </div>
        </div>;
});

export default ModalInfo;