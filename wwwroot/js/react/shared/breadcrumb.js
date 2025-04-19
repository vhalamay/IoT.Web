import React from 'react';
import { Link } from "react-router-dom";

export default class Breadcrumb extends React.Component {
    render() {
        let olContent = this.props.breadcrumbs.map((breadcrumb, index) => 
            <div key={index} className="itm" title={breadcrumb.text}>
                {breadcrumb.href !== null 
                ? <><Link to={breadcrumb.href}>{breadcrumb.text}</Link><div>/</div></>
                : (breadcrumb.text)}
            </div>);
        
        return  <div className="l-brd-crmb">
                    {olContent}
                </div>;
    }
}