import UserCard from "./UserCard";
import React from "react";
import './styles/List.css';

const UserList = ({users,updateList}) => {

    return (
        <ul className="list-group">
            { users.map( (user,index) => (
                <li key={user.id}>
                    <UserCard user={user} key={index} updateList={updateList} />
                </li>
            ))}
        </ul>
    )
}
export default UserList;