import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";


import {
    Api_Dashboard_DeviceSessionActivity,
    Api_Dashboard_SessionActivity
  } from '../../links';

export default function SessionActivityChart(props) {
  let [data, setData] = useState();

  let url = props.deviceId === undefined
    ? Api_Dashboard_SessionActivity()
    : Api_Dashboard_DeviceSessionActivity(props.deviceId);

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
    <div>
        <h4>Sessions & Activities Chart</h4>
        <ResponsiveContainer width={"100%"} height={250}>
        <BarChart
            data={data}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
            dataKey="sessions"
            fill="#1982c4"
            activeBar={<Rectangle fill="#f1ba0a" stroke="1982c4" />}
            />
            <Bar
            dataKey="activities"
            fill="#f1ba0a"
            activeBar={<Rectangle fill="#1982c4" stroke="f1ba0a" />}
            />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
