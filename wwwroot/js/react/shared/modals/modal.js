import React, { useState, useImperativeHandle } from 'react';

const Modal = React.forwardRef(function Modal(props, ref) {
    let [active, setActive] = useState(false);

    const open = () => {
        setActive(true);
    };

    const close = () => {
        setActive(false);
    };

    const confirm = () => {
        props.confirmAction();
    };

    useImperativeHandle(ref, () => ({
        open: open,
        close: close
      }));

    let confirmTopText = props.confirmTopText ?? 'Confirmation';

    let confirmButtonText = props.confirmButtonText ?? 'Confirm';
    let closeButtonText = props.closeButtonText ?? 'Close';

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
                    <button className='l-btn' onClick={confirm}>{confirmButtonText}</button>
                    <button className='l-btn l-grey' onClick={close}>{closeButtonText}</button>
                </div>
            </div>
        </div>;
});

export default Modal;