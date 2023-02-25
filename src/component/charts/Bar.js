import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarReport () {
    const data = [
        {
          name: 'ECS 201',
          new: 50,
          old: 40,
          amt: 30,
        },
        {
          name: 'ECS 202',
          new: 30,
          old: 45,
          amt: 25,
        },
        {
          name: 'ECS 203',
          new: 20,
          old: 10,
          amt: 5,
        },
        {
          name: 'ECS 204',
          new: 15,
          old: 20,
          amt: 25,
        },
        {
          name: 'ECS 205',
          new: 10,
          old: 20,
          amt: 30,
        },
        {
          name: 'ECS 206',
          new: 30,
          old: 10,
          amt: 20,
        },
        {
          name: 'ECS 207',
          new: 20,
          old: 30,
          amt: 10,
        },
      ];
      
       
          return (
              <BarChart
                width={375}
                height={225}
                data={data}
              >
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="old" fill="#8884d8" />
                <Bar dataKey="new" fill="#82ca9d" />
              </BarChart>
          );
      
}

export default BarReport;
