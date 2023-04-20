import React, { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API } from 'aws-amplify';

function UserReservationGraph () {
  const [data,setData] = useState([]);
  const loggedUser = decodeURIComponent(escape(window.atob(localStorage.getItem('email'))));

  useEffect( ()=>{
    var oCount = 0;
    var aCount = 0;
    var rcount = 0;
    // console.log(loggedUser);

    API.get("reservation","/reservation").then( res => {
        res.forEach(element => {
            if (element.email === loggedUser) {
                if (element.status === "Open") oCount++;
                else if (element.status === "Assigned") aCount++;
                else if (element.status === "Returned") rcount++;
            }
        });

        const df = [
          {
            name: 'Reservation',
            Open: oCount,
            Assigned: aCount,
            Returned : rcount
          },
        ];
        setData(df);
    })

  },[]);
          return (
            <>
            <div className="top">  <p className="chartLabel">Reservation Summary</p>   
            <ResponsiveContainer width="95%" height="80%">
                <BarChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Open" fill="#8884d8" />
                    <Bar dataKey="Assigned" fill="#82ca9d" />
                    <Bar dataKey="Returned" fill="#8a9bbd" />

                </BarChart>   
            </ResponsiveContainer>
             </div>
            </>
          );
      
}

export default UserReservationGraph;
