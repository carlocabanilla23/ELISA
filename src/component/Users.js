import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import UserList from "./List/UserList";
import Pagination from "./Pagination";
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import OffCanvasCardUser from './card/OffCanvasCardUser';


function Users () {
    const {param} = useParams();
    // Init();
    const [users, setUsers] = useState([]);
    const [unfilteredUsers, setUnfilteredUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(15);

    // Offcanvas
    const [offCanvasUser, setOffCanvasUser] = useState('');
    // const [activityHistory, setActivityHistory] = useState([]);
    const [actionName, setActionName] = useState('');
    const [refreshvalue, setRefreshValue] = useState('');

    useEffect( () => {
        API.get("userapi","/email").then( res => {
            res.sort((a,b) => {
                var tA = Number.parseInt(a.schoolID);
                var tB = Number.parseInt(b.schoolID);
                if(isNaN(tA) && isNaN(tB)){
                    return a.roomno.localeCompare(b.schoolID);
                }else if(isNaN(tA)){
                    return -1;
                }else if(isNaN(tB)){
                    return 1;
                }else{
                    return Math.sign(tA - tB);
                }
            });
            if (param !== undefined) {
                const updatedList = res.filter(user => user.email === param);
                setUsers([...users,...updatedList]);
                setUnfilteredUsers([...users,...updatedList]);
            }else {
                setUsers([...users,...res]);
                setUnfilteredUsers([...users,...res]);
            }
        })
        console.log(param);
    },[]);

    const navigate = useNavigate();

    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    const updateList = (email) => {
        API.del("userapi","/email/object/"+email);
        const updatedList = users.filter(user => user.email !== email);
        setUsers(updatedList);
        setUnfilteredUsers(updatedList);
    }

    const updateStatus = (email, status) => {
        // make an API call to update the user's status in the database
        API.put("userapi", "/email/object/" + email, {
          body: { status }
        }).then(() => {
          // update the status of the user 
          const updatedUsers = users.map(user => {
            if (user.email === email) {
              return { ...user, status };
            }
            return user;
          });
          setUsers(updatedUsers);
          setUnfilteredUsers(updatedUsers);
        });
    };

    // View User Information in OffCanvas
    const ViewInformation = (user) => {
        setOffCanvasUser(user);
        setActionName("User Information");
        document.getElementById("user-info").style.display = "block";
        // document.getElementById("user-history").style.display = "none";
        document.getElementById("changeRole").style.display = "none";
        document.getElementById("changeStatus").style.display = "none";
    }

    // View User Activity History in OffCanvas
    // const ViewHistory = (user) => {
    //     setOffCanvasUser(user);
    //     setActionName("User History");
    //     document.getElementById("user-info").style.display = "none";
    //     document.getElementById("user-history").style.display = "block";
    //     document.getElementById("changeRole").style.display = "none";
    //     document.getElementById("changeStatus").style.display = "none";
    // }

    // Change user Role in OffCanvas
    const changeRole = (user) => {
        setRefreshValue(Math.random());
        setOffCanvasUser(user);
        setActionName("Change Role");
        document.getElementById("user-info").style.display = "none";
        // document.getElementById("user-history").style.display = "none";
        document.getElementById("changeRole").style.display = "block";
        document.getElementById("changeStatus").style.display = "none";
    }

    // Change user Status in OffCanvas
    const changeStatus = (user) => {
        setRefreshValue(Math.random());
        setOffCanvasUser(user);
        setActionName("Change Status");
        document.getElementById("user-info").style.display = "none";
        // document.getElementById("user-history").style.display = "none";
        document.getElementById("changeRole").style.display = "none";
        document.getElementById("changeStatus").style.display = "block";
    }
  
    const searchUser = (e) => {
        if (e.length > 0) {
            const searcedhUser = unfilteredUsers.filter((user) => user.email.toLowerCase().includes(e) || 
                                                            user.firstname.toLowerCase().includes(e) || 
                                                            user.lastname.toLowerCase().includes(e) || 
                                                            user.schoolID.includes(e));
                                                            // user.status.includes(e));
            setUsers(searcedhUser);
        }else{
            setUsers(unfilteredUsers);
        }
       
    }  
// code to generate the CSV file and download it to the local machine

        const CSV = () => {      
        // the data that you want to write to the CSV file
        const data = [];
        users.forEach(user => {
            data.push([user.firstname, user.lastname, user.email, user.role, user.schoolID]);
        });
  

// generate the CSV file
const csv = Papa.unparse({
    fields: ['firstName', 'lastName', 'schoolID', 'role'],
    data: data
});

  // the CSV file
            const a = document.createElement('a');
            a.href = 'data:attachment/csv,' + csv;
             a.target = '_blank';
            a.download = 'output.csv';
            document.body.appendChild(a);
            a.click();
}

const PDF = () => {     // Exporting to pdf 
    const doc = new jsPDF();
   // const users = [
   //   { firstName: 'John', lastName: 'Patrick', schoolID: '474593', role: 'student'}
   //   { firstName: 'Jane', lastName: 'Doe', schoolID: '987654', role: 'teacher' }
  //  ];
    const data = [['FIRST NAME', 'LAST NAME', 'EMAIL', 'ROLE']];
    users.forEach(user => {
        data.push([user.firstname, user.lastname, user.email, user.role, user.schoolID]);
    });
    doc.autoTable({
     //   head: [['firstName', 'lastName', 'schoolID', 'role']],
        body: data
    });
    
    const pdf = doc.output();
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + btoa(pdf);
    link.download = 'users.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

  


  
    
    const idxLastUser = currentPage * usersPerPage;
    const idxFirstUser = idxLastUser - usersPerPage;
    const currentList = users.slice(idxFirstUser,idxLastUser);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(users.length / usersPerPage) + 1 ) {

           var obj = document.getElementById(currentPage);
            obj.style.backgroundColor = "#F0F0EB";
            obj.style.color = "#3E2B2E";

            setCurrentPage(pageNumber);

            obj = document.getElementById(pageNumber);
            obj.style.backgroundColor = "#3E2B2E";
            obj.style.color = "#ffffff";
        }
    };

    return (
    <div className="Users">
        
        
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span className="material-symbols-outlined">group</span>
                    <span>Users</span>
            
                <div className="searchBar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search User"/>
                </div>

                <div className="AddUser">
                    <button type="submit" className="btn" id="AddUser" onClick={AddUser}>Add User</button>
                </div>

                <div className="col-auto-dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={CSV} >CSV</a></li>
                        <li><a className="dropdown-item" onClick={PDF} >PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div className="UserPane">
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col"> School ID </div>
                            <div className="col"> First Name </div>
                            <div className="col"> LastName </div>
                            <div className="col"> Role </div>
                            <div className="col"> Email </div>
                            <div className="col"> Phone </div>
                            <div className="col"> Status </div>
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>
                <UserList
                    users={currentList}
                    updateList={updateList}
                    ViewInformation={ViewInformation}
                    // ViewHistory={ViewHistory}
                    changeRole={changeRole}
                    changeStatus={changeStatus} />
                <Pagination
                    PerPage={usersPerPage} 
                    total={users.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    /> 
        </div>
        
        {/* OffCanvas */}
        <OffCanvasCardUser user={offCanvasUser} actionName={actionName} refreshvalue={refreshvalue}/>
    </div>    
    
    )
}

export default Users;