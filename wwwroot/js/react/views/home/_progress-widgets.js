import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Loader from '../../shared/loader';
import WidgetChart from '../../shared/widgets/chart';

import {
    Api_Widgets_Progress
} from './../../links';

export default function ProgressWidgets(props) {
    let [data, setData] = useState(null);
    let [leaded, setLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoaded(false);

        axios
        .get(Api_Widgets_Progress())
        .then(function (response) {
            setData(response.data);
            setLoaded(true);
        });
    }

    var charts = data === null ? null :
        data.items.map((chart, index) => 
            <WidgetChart chart={chart} key={index}/>);

    return leaded === false ? <Loader /> : 
        <div className='l-chrts'>
            {charts}
        </div>;
}