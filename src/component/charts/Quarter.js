import { API } from 'aws-amplify';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
// ELISA\src\component\styles\graph.css
function QuarterReport () {
  const [data,setData] = useState([]);
  const [label,setLabel] = useState([]);
  const lbl1 = useState("thermometer");

  useEffect (()=>{
    API.get("reservationcart","/cart").then(res => {
      let itemFrequency = new Map();
      res.forEach(element => {
        for (let i=0;i<element.itemrequested.length;i++) {
          if (itemFrequency.has(element.itemrequested[i].type)) {
            itemFrequency.set(element.itemrequested[i].type, itemFrequency.get(element.itemrequested[i].type) + 1);
          }
          else {
              itemFrequency.set(element.itemrequested[i].type, 1);
          }
        } 
       
      });
      const dataframe = new Map([...itemFrequency.entries()].sort((a,b)=> b[1] - a[1]).splice(0,10))
      const datalabel = [...dataframe.keys()];

   
      setLabel(datalabel)
      // setDataFrame(data)
      let obj = {
          name : "Item Summary"
      }
      
      datalabel.forEach( e => {
          obj[e] = dataframe.get(e)
      })
      let d = []
      d.push(obj)
      console.log(d);
      setData(d)
      // tmpMap.forEach(element => console.log(Object.keys()));
     
  });
  },[]);

  // const data = [
  //   {
  //     name: 'Fall',
  //     tunew: 34,
  //     thermometer: 50,
  //     ohmeter: 35,
  //     voltmeter: 20,
  
  //   }
  // ];
  

return ( 
      <>
      {console.log(label)}
        <ResponsiveContainer width="95%" height={450}>
              <BarChart width={550} height={225} data={data}>
          <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          
              
              {label.map( (label,index) => (
                     <Bar dataKey={label} fill="#9C1003" />  
            ))}
 
        
            {/* <Bar dataKey="tester" fill="#A91B0D" />
          
            <Bar dataKey="lolol" fill="#D0312D" />
            <Bar dataKey="thermometer" fill="#B80F0A" /> */}
            </BarChart>
        </ResponsiveContainer>
      </>
    
);
}


export default QuarterReport;