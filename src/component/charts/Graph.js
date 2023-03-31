import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../assets/styles/graph.css';
import { useEffect } from 'react';
import { API } from 'aws-amplify';
// ELISA\src\component\styles\graph.css
function GraphReport () {
  const [data,setData] = useState([]);

  useEffect (()=>{
    var neww = 0;
    var old = 0;
    var broken = 0;
    let data = [];

    API.get("inventory","/items").then( res => {
      let itemFrequency = new Map();
      res.forEach(element => {
          if (itemFrequency.has(element.roomno)) {
            itemFrequency.set(element.roomno, itemFrequency.get(element.roomno) + 1);
          }
          else {
              itemFrequency.set(element.roomno, 1);
          }
        
       
      });

      const datalabel = [...itemFrequency.keys()];

        datalabel.forEach(element => {

          let d = {
            name : element,
            value : itemFrequency.get(element)
          }
        data.push(d);
      });

        setData(data)
      });
      
  },[]);


    
    return (
      <>
        <ResponsiveContainer width="95%" height={450}>
            <BarChart width={550} height={225} data={data}>
              <CartesianGrid  />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#910D09" />
            </BarChart>
        </ResponsiveContainer>
        </>
      
    );
}

export default GraphReport;