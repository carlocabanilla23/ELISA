import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
// ELISA\src\component\styles\graph.css
function GraphReport2 () {
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        }
      ];
      

    return (
        <BarChart width={300} height={200} data={data}>
            <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
    );
}

export default GraphReport2;