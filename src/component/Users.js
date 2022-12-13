import ListUsers from "./ListUsers";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./Users.css";

function Users () {
    const [users, setUsers] = React.useState([]);

    useEffect( () => {
      API.get("userapi","/email").then( res => 
        setUsers([...users,...res]));
        },[]);
   
    return (
    <div className="UserPane">
        <div className="UserHeader">
        </div>
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

        {users.map( (userRes,index) => <ListUsers user={userRes} key={index}/>)}
    </div>
    )
}

export default Users;