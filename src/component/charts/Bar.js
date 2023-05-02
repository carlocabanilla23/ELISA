import React, { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API } from 'aws-amplify';
function BarReport () {
  const [data,setData] = useState([]);

  useEffect( ()=>{
    var oCount = 0;
    var aCount = 0;

    API.get("reservation","/reservation").then( res => {
        res.forEach(element => {
            if (element.status === "Reserved") oCount++;
            else if (element.status === "Returned") aCount++;
        });

        const df = [
          {
            name: 'Reservation',
            Reserved: oCount,
            Returned: aCount,
          },
        ];
        setData(df);
    })

  },[]);
          return (
            <>
            <div className="top">  <p className="chartLabel">Reservation Summary</p>   
            <ResponsiveContainer width="95%" height="80%">
                <BarChart width={550} height={225} data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Reserved" fill="#27AE60" />
                    <Bar dataKey="Returned" fill="#F2994A" />
                </BarChart>   
            </ResponsiveContainer>
             </div>
            </>
          );
      
}

export default BarReport;
