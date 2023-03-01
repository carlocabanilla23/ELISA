import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
// ELISA\src\component\styles\graph.css
function QuarterReport () {
  const data = [
    {
      name: 'Fall',
      ohmeter: 34,
      thermometer: 50,
      tester: 35,
      volmeter: 20,
      lolol: 15,
      tutu: 35,
    },
    {
      name: 'Winter',
      ohmeter: 34,
      thermometer: 50,
      tester: 35,
      volmeter: 20,
      lolol: 15,
      tutu: 35,
    },
    {
      name: 'Spring',
      ohmeter: 34,
      thermometer: 50,
      tester: 35,
      volmeter: 20,
      lolol: 15,
      tutu: 35,
    },
    {
      name: 'Summer',
      ohmeter: 34,
      thermometer: 50,
      tester: 35,
      volmeter: 20,
      lolol: 15,
      tutu: 35,
    },
    
  ];
  

return (
    <BarChart width={550} height={225} data={data}>
    <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="ohmeter" fill="#E2252B" />
      <Bar dataKey="thermometer" fill="#D21502" />
      <Bar dataKey="tester" fill="#A91B0D" />
      <Bar dataKey="volmeter" fill="#9C1003" />
      <Bar dataKey="lolol" fill="#D0312D" />
      <Bar dataKey="tutu" fill="#B80F0A" />
    </BarChart>
);
}


export default QuarterReport;