import ListUsers from "./ListUsers";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function Users () {
    const [users,setUsers] = React.useState([]);
    
    useEffect( () => {
        const users = API.get("userapi","/email")
        .then(res => {
            setUsers([...users,...res]);
        })
    });


   console.log(users);
    return (
    <div>
        <ul>
            <li>{users.lastname}</li>
           {
            users.map(res => {
                console.log(res);
                <li>{res.firstname}</li>
            })
           }
        </ul>
    </div>
    )
}

export default Users;