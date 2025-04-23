import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Api_Session_Dashboard,
} from '../../links';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityLabels = {
  0: "Started",
  1: "Phone in Motion",
  2: "Phone Stationary",
  3: "Motion Detected",
  4: "Object Detected",
  5: "Finished",
};

export default function InvertedLineChart(props) {
  let [data, setData] = useState();

  const getData = () => {
    axios
    .get(Api_Session_Dashboard(props.sessionId))
    .then(function (response) {
      setData(response.data.items);
      console.log(response.data.items);
    });
  };

  useEffect(() => {
    getData();
  },[]);  

  return (
    <div className="chart-wrapper">
      <h4>Session Activity Chart</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="duration"
            label={{ value: "Duration (s)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            width={160}
            domain={[5, 0]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={(value) => activityLabels[value]}
            label={{
              value: "Activity",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip
            formatter={(value) => activityLabels[value]}
            labelFormatter={(label) => `Duration: ${label}s`}
          />
          <Line
            type="stepAfter"
            dataKey="activity"
            stroke="#1982c4"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
