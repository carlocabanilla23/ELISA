import React, { PureComponent, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
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

        // console.log(itemFrequency)
        datalabel.forEach(element => {
        console.log(element);
        // console.log(itemFrequency[element.key()])
          let d = {
            name : element,
            value : itemFrequency.get(element)
          }
        data.push(d);
      });
        console.log(data)
        setData(data)
        // });
        // const dt = [
        //   { name: 'New', value: neww },
        //   { name: 'Old', value: old },
        //   { name: 'Broken', value: broken },
        // ];
          // setData(dt);
          
      });
      
  },[]);


    // const data = [
    //     {
    //       name: 'ECS 201',
    //       ohmeter: 34,
    //       thermometer: 50,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 202',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 203',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 204',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 205',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 206',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //     {
    //       name: 'ECS 207',
    //       ohmeter: 34,
    //       thermometer: 49,
    //       tester: 35,
    //       volmeter: 20,
    //     },
    //   ];
      

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