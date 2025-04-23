import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

import {
    Api_Dashboard_ActivityTypes,
    Api_Dashboard_ActivityTypes_Session,
    Api_Dashboard_ActivityTypes_Device,
  } from '../../links';

export default function ActivityTypesChart(props) {
    let [data, setData] = useState();
  
    let url = Api_Dashboard_ActivityTypes();

    if(props.sessionId !== undefined){
        url = Api_Dashboard_ActivityTypes_Session(props.sessionId);
    }
  
    if(props.deviceId !== undefined){
        url = Api_Dashboard_ActivityTypes_Device(props.deviceId);
    }

    const getData = () => {
      axios
      .get(url)
      .then(function (response) {
        setData(response.data.items);
        console.log(response.data.items);
      });
    };
  
    useEffect(() => {
      getData();
    },[]);  

    return (
        <div className='activity-types-chart'>
            <h4>Activity Types Chart</h4>
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar dataKey="count" stroke="#1982c4" fill="#1982c4" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
      </div>
    );
}
