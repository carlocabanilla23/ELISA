import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend , ResponsiveContainer, Tooltip } from 'recharts';
import '../../assets/styles/graph.css';

function ScatterReport () {
  const [data,setData] = useState([]);

  useEffect (()=>{
    var available = 0;
    var reserved = 0;
    var unavailable = 0;

    API.get("items","/items/status").then( itemRes => {
      // console.log(itemRes)
        itemRes.forEach(element => {
          if (element.status === "Available") { available++ }
          else if (element.status === "Reserved") { reserved++ }
          else if (element.status === "Unavailable") { unavailable++ }
        });
        const dt = [
          { name: 'Available', value: available },
          { name: 'Reserved', value: reserved },
          { name: 'Unavailable', value: unavailable },
        ];
        setData(dt);
      });
  },[]);
// hex color codes of red

  const COLORS = ['#27AE60', '#F2994A', '#910D09'];

  // const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);
  }

  
    return (
      <>
        <div className="bottom">  <p className="chartLabel">Item Status Summary</p>   
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
        </div>
        </>
    );
}
export default ScatterReport;