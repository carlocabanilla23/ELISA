import React, { PureComponent, useState,useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API } from 'aws-amplify';
function BarReport () {
  const [data,setData] = useState([]);

  useEffect( ()=>{
    var oCount = 0;
    var aCount = 0;

    API.get("reservation","/reservation").then( res => {
        res.map(element => {
            if (element.status === "Open") oCount++;
            else if (element.status === "Assigned") aCount++;
        });
        // setOpenCount(oCount);
        // setAssignCount(aCount);

        const df = [
          {
            name: 'Reservation',
            Open: oCount,
            Assign: aCount,
          },
        ];
        setData(df);
    })

  },[]);
          return (
            <>
            <ResponsiveContainer width="95%" height="80%">
                <BarChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Open" fill="#8884d8" />
                    <Bar dataKey="Assign" fill="#82ca9d" />
                </BarChart>   
            </ResponsiveContainer>
             
            </>
          );
      
}

export default BarReport;
