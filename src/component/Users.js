import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import Pagination from "./Pagination";
import CreateTestUser from './test/CreateTestUser';
import Papa from 'papaparse';
import jsPDF from 'jspdf';


function Users () {
    // CreateTestUser(25);
    const [users, setUsers] = useState([]);
    const [unfilteredUsers, setUnfilteredUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [usersPerPage] = useState(15);

   

    useEffect( () => {
        API.get("userapi","/email").then( res => {
            setUsers([...users,...res]);
            setUnfilteredUsers([...users,...res]);
        })

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
      
    const searchUser = (e) => {
        if (e.length > 0) {
            const searcedhUser = unfilteredUsers.filter((user) => user.email.toLowerCase().includes(e) || 
                                                            user.firstname.toLowerCase().includes(e) || 
                                                            user.lastname.toLowerCase().includes(e) || 
                                                            user.schoolID.includes(e) ||
                                                            user.status.includes(e));
            setUsers(searcedhUser);
        }else{
            setUsers(unfilteredUsers);
        }
       
    }  
// code to generate the CSV file and download it to the local machine

        const CSV = () => {      
        // the data that you want to write to the CSV file
        const data = [['firstName', 'lastName', 'email', 'role', 'schoolID']];
        users.forEach(user => {
            data.push([user.firstName, user.lastName, user.email, user.role, user.schoolID]);
        });
  

// generate the CSV file
            const csv = Papa.unparse(data);

  // the CSV file
            const a = document.createElement('a');
            a.href = 'data:attachment/csv,' + csv;
             a.target = '_blank';
            a.download = 'output.csv';
            document.body.appendChild(a);
            a.click();
}
const PDF = () => {
    const doc = new jsPDF();
    const users = [
      { firstname: 'John', lastname: 'Doe', schoolID: '123456', role: 'student' },
     { firstname: 'Jane', lastname: 'Doe', schoolID: '987654', role: 'teacher' }
    ];
    let y = 10;
    for (const user of users) {
      doc.text(`Name: ${user.firstname} ${user.lastname}`, 10, y);
      y += 5;
      doc.text(`School ID: ${user.schoolID}`, 10, y);
      y += 5;
      doc.text(`Role: ${user.role}`, 10, y);
      y += 10;
    }
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
        <Sidebar />
        <Header />
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span class="material-symbols-outlined">group</span>
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
                <UserList users={currentList} updateList={updateList}/>
                <Pagination
                    PerPage={usersPerPage} 
                    total={users.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    /> 
        </div>
        {/* <div className="right-sidemenu">
            aa

        </div> */}
    </div>    
    
    )
}

export default Users;