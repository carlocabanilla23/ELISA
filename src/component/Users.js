import ListUsers from "./ListUsers";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Users () {
    const [users, setUsers] = useState([]);
    const [unfilteredUsers, setUnfilteredUsers] = useState([]);
    const navigate = useNavigate();

    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    useEffect( () => {
      API.get("userapi","/email").then( res => {
            setUsers([...users,...res]);
            setUnfilteredUsers([...users,...res]);
        })},[]);

    const updateList = (email) => {
        API.del("userapi","/email/object/"+email);
        const updatedList = users.filter(user => user.email !== email);
        setUsers(updatedList);
        setUnfilteredUsers(updatedList);
    } 
    const searchUser = (e) => {
        if (e.length > 0) {
            const searcedhUser = unfilteredUsers.filter((user) => user.email.toLowerCase().includes(e) || 
                                                            user.firstname.toLowerCase().includes(e) || 
                                                            user.lastname.toLowerCase().includes(e) || 
                                                            user.schoolID.includes(e));
            setUsers(searcedhUser);
        }else{
            setUsers(unfilteredUsers);
        }
       
    }  
   
    return (
    <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold"> 
                    <i className="fa fa-users" aria-hidden="true"> Users</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchUser(e.target.value)} } id="exampleFormControlInput1" placeholder="Search User"/>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" className="btn" id="AddUser" onClick={AddUser}>Add User</button>
                </div>

                <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">CSV</a></li>
                            <li><a className="dropdown-item" href="#">PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <div className="UserRowTitle">
                <div className="container">
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
          
                {users.map( (userRes,index) => <ListUsers user={userRes} key={index} updateList={updateList} />)}
                   
        </div>
    </div>    
    
    )
}

export default Users;