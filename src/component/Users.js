import ListUsers from "./ListUsers";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Users () {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const AddUser = e => {
        e.preventDefault();
        navigate('/CreateUser');
    }

    useEffect( () => {
      API.get("userapi","/email").then( res => 
        setUsers([...users,...res]));
        },[]);

    const updateList = (email) => {
        API.del("userapi","/email/object/"+email);
        const updatedList = users.filter(user => user.email !== email);
        setUsers(updatedList);
    } 
    const searchUser = (e) => {
        console.log(query);
        API.get("userapi","/email/"+query).then( res => 
            setUsers([res])
            // console.log(res)
    )
};   
   
    return (
    <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold"> 
                    <i class="fa fa-users" aria-hidden="true"> Users</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" class="form-control" onChange={ (e)=> setQuery("object/"+e.target.value)} id="exampleFormControlInput1" placeholder="Search User"/>
                </div>
                <div className="col searchbarBtn">
                    <button type="email" class="btn primary" onClick={searchUser} id="exampleFormControlInput1" placeholder="Search User">Search</button>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" class="btn" id="AddUser" onClick={AddUser}>Add User</button>
                </div>

                <div className="col auto dropdown">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">CSV</a></li>
                            <li><a class="dropdown-item" href="#">PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <div className="UserRowTitle">
                <div class="container">
                    <div class="row">
                            <div class="col"> School ID </div>
                            <div class="col"> First Name </div>
                            <div class="col"> LastName </div>
                            <div class="col"> Role </div>
                            <div class="col"> Email </div>
                            <div class="col"> Phone </div>
                            <div class="col"> Status </div>
                            <div class="col"> Actions</div>        
                    </div>
                </div>
            </div>
          
                {users.map( (userRes,index) => <ListUsers user={userRes} key={index} updateList={updateList} />)}
                   
        </div>
    </div>    
    
    )
}

export default Users;