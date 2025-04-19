import React from 'react';
import Link from './buttons/lnk';

export default class TopButtons extends React.Component {
    render() {
        let buttons = this.props.buttons.map((button, index) => 
                <Link   key={index} 
                        className={button.className}
                        isBtn={true}
                        href={button.href}
                        onClick={button.onClick}
                        text={button.title} // todo make it take as well
                        title={button.title}/>);

        return <div className="l-top-btns">
                    {buttons}
                </div>;
    }
}