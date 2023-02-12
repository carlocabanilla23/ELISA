import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
// ELISA\src\component\styles\graph.css
function GraphReport () {
    const data = [
        {
          name: 'ECS 201',
          ohmeter: 34,
          thermometer: 50,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 202',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 203',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 204',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 205',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 206',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
        {
          name: 'ECS 207',
          ohmeter: 34,
          thermometer: 49,
          tester: 35,
          volmeter: 20,
        },
      ];
      

    return (
        <BarChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ohmeter" fill="#910D09" />
          <Bar dataKey="thermometer" fill="#791812" />
          <Bar dataKey="tester" fill="#BC5449" />
          <Bar dataKey="volmeter" fill="#990F02" />
        </BarChart>
    );
}

export default GraphReport;