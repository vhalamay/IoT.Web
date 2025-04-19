import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Style from '../../css/style.scss';

let appElement =  document.getElementById("app-element");

ReactDOM.render(<App/>, appElement);