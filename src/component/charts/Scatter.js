import { API } from 'aws-amplify';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Legend , ResponsiveContainer, Tooltip } from 'recharts';
import '../../assets/styles/graph.css';

function ScatterReport () {
  const [data,setData] = useState([]);

  useEffect (()=>{
    var neww = 0;
    var old = 0;
    var broken = 0;


    API.get("items","/items/status").then( itemRes => {
      // console.log(itemRes)
        itemRes.forEach(element => {
          if (element.status === "New") { neww++ }
          else if (element.status === "Old") { old++ }
          else if (element.status === "Broken") {broken++ }

         

        });
        const dt = [
          { name: 'New', value: neww },
          { name: 'Old', value: old },
          { name: 'Broken', value: broken },
        ];
          setData(dt);
          
      });
      
  },[]);

    
  
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  }

  
    return (
      <>
    
        <ResponsiveContainer width="95%" height="80%">
            <PieChart width={350} height={225}>
              <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                legendType="circle"
                
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
        </ResponsiveContainer>
        </>
    );
}


export default ScatterReport;