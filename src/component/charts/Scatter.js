import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend , ResponsiveContainer } from 'recharts';
import '../styles/graph.css';

function ScatterReport () {

    
  const data = [
    { name: 'Low Stock', value: 10 },
    { name: 'Old', value: 7 },
    { name: 'Broken', value: 8 },
    { name: 'Reserved', value: 25 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  }

  
    return (
        <PieChart width={350} height={225}>
          <Pie
            data={data}
            // cx="50%"
            // cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            // outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            legendType="circle"
            
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
    );
}


export default ScatterReport;