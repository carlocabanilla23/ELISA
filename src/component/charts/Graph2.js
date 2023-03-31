import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import '../../assets/styles/graph.css';
// ELISA\src\component\styles\graph.css

function GraphReport2 () {
  const [active,setActive] = useState(0);
  const [inactive,setInactive] = useState(0);
  const [student,setStudent] = useState(0);
  const [professor,setProfessor] = useState(0);
  const [ta,setTA] = useState(0);
  const [admin,setAdmin] = useState(0);

  useEffect( ()=>{
    var acount = 0;
    var icount = 0;
    var stuCount = 0;
    var proCount = 0;
    var tacount = 0;
    var admCount = 0;
    API.get("userapi","/email").then( res => {
        res.map(element => {
            if (element.status === "active" || element.status === "verified") {
                acount++;
            } else {
                icount++;
            }

            if (element.role === "Student") stuCount++;
            else if (element.role === "Professor") proCount++;
            else if (element.role === "TA") tacount++;
            else if (element.role === "Admin") admCount++;
        });
        setActive(acount);
        setInactive(icount);
        setAdmin(admCount);
        setStudent(stuCount);
        setProfessor(proCount);
        setTA(tacount);
    })

  },[]);

    

    return (
        <div className="summary">
            <div className="summaryItem">
              <span className="summaryTitle">Active Users</span>
              <span className="summaryCount">{active}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Inactive User</span>
              <span className="summaryCount">{inactive}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Student</span>
              <span className="summaryCount">{student}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Professor</span>
              <span className="summaryCount">{professor}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">TA</span>
              <span className="summaryCount">{ta}</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Admin</span>
              <span className="summaryCount">{admin}</span>
            </div>
          </div>
    );
}

export default GraphReport2;