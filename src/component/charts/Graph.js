import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../assets/styles/graph.css';
import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
// ELISA\src\component\styles\graph.css
function GraphReport () {
  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect (()=>{
    let data = [];

    API.get("items","/items/allroom").then( res => {
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


    const goToR = (locationno) => {
      // console.log(locationno.name);
      navigate('/Location/' + locationno.name );
    }
    return (
      <>
      <div className="top"> <p className="chartLabel">Inventory Summary</p>  
        <ResponsiveContainer width="95%" height="80%">
            <BarChart width={550} height={225} data={data}>
              <CartesianGrid  />
                <XAxis dataKey="name" />
                <YAxis />
                  <Tooltip  />                
                <Bar dataKey="value" fill="#910D09" onClick={ (data) => goToR(data)}/>
            </BarChart>
        </ResponsiveContainer>
        </div>
        </>
      
    );
}

export default GraphReport;